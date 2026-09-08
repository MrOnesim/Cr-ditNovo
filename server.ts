import 'dotenv/config';
import express from 'express';
import { Pool } from 'pg';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ADMIN_HTML } from './api/admin-page.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = Number(process.env.PORT) || 8080;

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL est manquant. Créez un fichier .env (voir .env.example) avec l\'URL de votre base Neon.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ── Authentification admin (token HMAC) ────────────────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
// Slug secret : APP définit où se trouve l'espace conseiller
// (URL /<slug> pour la page et /api/<slug>/... pour ses endpoints).
const ADMIN_SLUG = (process.env.VITE_ADMIN_SLUG || '').replace(/^\/+|\/+$/g, '');
const adminApi = (p: string) => `/api/${ADMIN_SLUG}${p}`;
const TOKEN_SECRET =
  process.env.JWT_SECRET ||
  crypto
    .createHash('sha256')
    .update(ADMIN_PASSWORD || 'creditnovo-dev-secret')
    .digest('base64');
const TOKEN_TTL_MS = Number(process.env.ADMIN_TOKEN_TTL) || 12 * 60 * 60 * 1000;

function signToken(): string {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS })).toString('base64url');
  const sig = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyToken(token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (token && verifyToken(token)) return next();
  res.status(401).json({ error: 'Authentification requise' });
}

app.disable('x-powered-by');

// CORS permissif : les liens des fichiers sont ouverts depuis WhatsApp / email / navigateur
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Les fichiers peuvent atteindre ~3 Mo (base64 ≈ 4 Mo) en dessous de la
// limite de 4,5 Mo imposée par les fonctions serverless Vercel.
app.use(express.json({ limit: '6mb' }));

function parseDataUrl(dataUrl: string): { mimeType: string; buffer: Buffer } {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Format dataUrl invalide');
  return { mimeType: match[1], buffer: Buffer.from(match[2], 'base64') };
}

function filePath(id: number, token: string) {
  return `/api/files/${id}/${token}`;
}

// ── Espace conseiller (routes cachées sous /api/<slug>/) ───────────────
// Uniquement accessibles si VITE_ADMIN_SLUG est défini. L'indisponibilité
// se traduit par des 404 standards, comme si ces routes n'existaient pas.
if (ADMIN_SLUG) {
  // Connexion admin
  app.post(adminApi('/login'), (req, res) => {
    if (!ADMIN_PASSWORD) {
      return res.status(500).json({ error: 'ADMIN_PASSWORD non configurée sur le serveur' });
    }
    const { password } = req.body ?? {};
    if (typeof password !== 'string' || !password) {
      return res.status(401).json({ error: 'Mot de passe requis' });
    }
    const input = crypto.createHash('sha256').update(password).digest();
    const stored = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
    if (crypto.timingSafeEqual(input, stored)) {
      return res.json({ token: signToken(), expiresIn: TOKEN_TTL_MS / 1000 });
    }
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  });

  // Vérification d'un token (permet au dashboard de tester sa session)
  app.get(adminApi('/me'), requireAuth, (_req, res) => {
    res.json({ ok: true });
  });

  // Liste des demandes (récapitulatifs, sans le contenu des fichiers)
  app.get(adminApi('/applications'), requireAuth, async (_req, res) => {
    try {
      const result = await pool.query(
        `SELECT a.*, json_agg(
           json_build_object(
             'id', f.id,
             'kind', f.kind,
             'fileName', f.file_name,
             'mimeType', f.mime_type,
             'path', '/api/files/' || f.id || '/' || f.token
           ) ORDER BY f.id
         ) FILTER (WHERE f.id IS NOT NULL) AS files
         FROM applications a
         LEFT JOIN application_files f ON f.application_id = a.id
         GROUP BY a.id
         ORDER BY a.created_at DESC
         LIMIT 200`
      );
      res.json(result.rows);
    } catch (err) {
      console.error('Erreur GET applications admin', err);
      res.status(500).json({ error: 'Erreur interne' });
    }
  });

  // Détail d'une demande
  app.get(adminApi('/applications/:id'), requireAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) return res.status(400).json({ error: 'id invalide' });

      const appRes = await pool.query('SELECT * FROM applications WHERE id = $1', [id]);
      if (appRes.rows.length === 0) return res.status(404).json({ error: 'Demande introuvable' });

      const filesRes = await pool.query(
        `SELECT id, kind, file_name, mime_type, '/api/files/' || id || '/' || token AS path
         FROM application_files WHERE application_id = $1 ORDER BY id`,
        [id]
      );

      res.json({ ...appRes.rows[0], files: filesRes.rows });
    } catch (err) {
      console.error('Erreur GET application admin', err);
      res.status(500).json({ error: 'Erreur interne' });
    }
  });
} else {
  console.warn('⚠️  VITE_ADMIN_SLUG non défini : espace conseiller désactivé.');
}

// ── Santé ──────────────────────────────────────────────────────────────
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, db: 'connected' });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

// ── Enregistrement d'une demande ───────────────────────────────────────
app.post('/api/applications', async (req, res) => {
  const { reference, form, simulation, files } = req.body ?? {};

  if (!reference || typeof reference !== 'string') {
    return res.status(400).json({ error: 'reference manquante' });
  }
  if (!form || !form.consent) {
    return res.status(400).json({ error: 'consentement RGPD requis' });
  }
  if (!Array.isArray(files)) {
    return res.status(400).json({ error: 'files doit être un tableau' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const {
      kind, profile, purpose, amount, months, companyName, siret,
      civility, firstName, lastName, email, phone, birth, country, city,
      employment, seniority, income, charges, housing, iban, consent, marketing,
    } = form;

    const insertRes = await client.query(
      `INSERT INTO applications (
        reference, kind, profile, purpose, amount, months, company_name, siret,
        civility, first_name, last_name, email, phone, birth, country, city,
        employment, seniority, income, charges, housing, iban, consent, marketing,
        monthly_payment, tann, taeg, total_interest, total_cost
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29)
      RETURNING id, reference`,
      [
        reference, kind, profile, purpose, Number(amount) || 0, Number(months) || 0,
        companyName || null, siret || null,
        civility, firstName, lastName, email, phone, birth, country, city,
        employment, seniority, income, charges, housing, iban || null,
        Boolean(consent), Boolean(marketing),
        simulation?.monthlyPayment ? Number(simulation.monthlyPayment) : null,
        simulation?.tann ? Number(simulation.tann) : null,
        simulation?.taeg ? Number(simulation.taeg) : null,
        simulation?.totalInterest ? Number(simulation.totalInterest) : null,
        simulation?.totalCost ? Number(simulation.totalCost) : null,
      ]
    );

    const applicationId = insertRes.rows[0].id;
    const storedFiles: Array<{ id: number; kind: string; fileName: string; mimeType: string; path: string }> = [];

    for (const file of files) {
      if (!file?.dataUrl) continue;
      const { mimeType, buffer } = parseDataUrl(file.dataUrl);
      if (!buffer.length) continue;

      const token = crypto.randomBytes(16).toString('hex');
      const fileRes = await client.query(
        `INSERT INTO application_files (application_id, kind, file_name, mime_type, content, token)
         VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
        [applicationId, file.kind, file.name || 'document', mimeType || 'application/octet-stream', buffer, token]
      );

      const fileId = fileRes.rows[0].id;
      storedFiles.push({
        id: fileId,
        kind: file.kind,
        fileName: file.name || 'document',
        mimeType: mimeType || 'application/octet-stream',
        path: filePath(fileId, token),
      });
    }

    await client.query('COMMIT');
    return res.status(201).json({
      id: applicationId,
      reference,
      files: storedFiles,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erreur POST /api/applications', err);
    return res.status(500).json({ error: 'Erreur interne lors de l\'enregistrement' });
  } finally {
    client.release();
  }
});

// ── Accès public à un fichier (image / PDF) ────────────────────────────
// Lien partagé dans WhatsApp : les images sont directement visibles, les
// PDF s'ouvrent dans le navigateur.
app.get('/api/files/:id/:token', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'id invalide' });

    const result = await pool.query(
      `SELECT file_name, mime_type, content, token FROM application_files WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Fichier introuvable' });

    const file = result.rows[0];
    if (req.params.token !== file.token) return res.status(403).json({ error: 'Accès refusé' });

    res.setHeader('Content-Type', file.mime_type);
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(file.file_name)}"`);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(file.content);
  } catch (err) {
    console.error('Erreur GET /api/files/:id/:token', err);
    res.status(500).json({ error: 'Erreur interne' });
  }
});

// ── Production : servir le build Vite si présent ───────────────────────
// Le bundling serverless (Vercel) peut déplacer dist/ à différents
// endroits : on teste plusieurs candidats.
const distCandidates = [
  path.resolve(__dirname, 'dist'),
  path.resolve(__dirname, '..', 'dist'),
  path.resolve(process.cwd(), 'dist'),
];
const distDir = distCandidates.find((d) => fs.existsSync(d));
if (distDir || ADMIN_SLUG) {
  if (ADMIN_SLUG) {
    // Le nom de fichier admin.html est masqué : on renvoie 404 pour être
    // indiscernable des autres chemins inexistants. La page réelle est servie
    // uniquement sur le chemin secret, depuis la chaîne embarquée au build.
    app.get('/admin.html', (_req, res) => res.status(404).type('text/plain').send('Not found'));
    app.get(`/${ADMIN_SLUG}`, (_req, res) => res.type('html').send(ADMIN_HTML));
  }
  if (distDir) {
    app.use(express.static(distDir));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }
}

// En local, `npm run server` exécute ce fichier directement.
// Sur Vercel, ce module est importé par api/index.ts : n'appelons pas
// app.listen (le runtime serverless fournit le handler).
const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`✅ CréditNovo API démarrée sur http://localhost:${PORT}`);
    console.log(`   Santé : http://localhost:${PORT}/api/health`);
    console.log(
      ADMIN_SLUG
        ? `   Espace conseiller (invisible) : http://localhost:${PORT}/${ADMIN_SLUG}`
        : '   Espace conseiller : désactivé (VITE_ADMIN_SLUG absent).'
    );
  });
}

export default app;