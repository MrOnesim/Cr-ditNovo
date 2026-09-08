import 'dotenv/config';
import { readFileSync } from 'fs';
import { Pool } from 'pg';

// Applique db/schema.sql sur la base configurée dans .env (DATABASE_URL)
const url = process.env.DATABASE_URL;
if (!url) {
  console.error('❌ DATABASE_URL manquante dans .env');
  process.exit(1);
}

const sql = readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8');
const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });

try {
  await pool.query(sql);
  const tables = await pool.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`
  );
  console.log('✅ Schéma appliqué. Tables : ' + tables.rows.map((r) => r.table_name).join(', '));
} catch (err) {
  console.error('❌ Erreur lors de l\'application du schéma :', err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}