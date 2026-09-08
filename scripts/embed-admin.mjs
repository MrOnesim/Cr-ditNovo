// Embarque dist/admin.html dans lib/admin-page.ts (servi uniquement par la
// fonction serverless sur le chemin secret /<slug>) puis supprime ce fichier
// du dossier statique afin que Vercel ne le publie jamais tel quel.
// Hors de api/ : Vercel traite chaque fichier de api/ comme une fonction
// serverless ; lib/ est un simple module inclus dans la fonction.
// Utilisé par le build : vite build && node scripts/embed-admin.mjs
import fs from 'fs';

const dist = 'dist';
const adminHtmlPath = `${dist}/admin.html`;
const outPath = 'lib/admin-page.ts';

if (!fs.existsSync(adminHtmlPath)) {
  console.error('❌ dist/admin.html introuvable. Lancer `npm run build` d’abord.');
  process.exit(1);
}

const html = fs.readFileSync(adminHtmlPath, 'utf8');
const code = `// FICHIER GÉNÉRÉ par scripts/embed-admin.mjs pendant le build.
// Ne pas modifier à la main.
export const ADMIN_HTML: string = ${JSON.stringify(html)};\n`;
fs.writeFileSync(outPath, code);
fs.rmSync(adminHtmlPath);

console.log('✓ admin.html embarqué dans lib/admin-page.ts et retiré du bundle statique.');