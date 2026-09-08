// Fonction serverless Vercel : toute l'app Express (API + fichiers + pages)
// est exposée ici. Express fournit lui-même le handler (req, res).
import server from '../server.js';

export default server;