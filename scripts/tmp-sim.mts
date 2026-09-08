import http from 'http';
import server from '../api/index.ts';

const s = http.createServer(server);
s.listen(8092, () => console.log('sim-no-db on 8092'));
process.on('SIGTERM', () => s.close());
process.on('SIGINT', () => s.close());