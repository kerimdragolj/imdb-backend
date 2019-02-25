/* eslint-disable no-console */
const app = require('./app');
const port = app.get('port');
const host = app.get('host');
const server = app.listen(port);
console.log('process.env.NODE_ENV is', process.env.NODE_ENV);

process.on('unhandledRejection', (reason, p) =>
  console.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  console.log('Feathers application started on http://'+ host + ':' + port)
);
