const http = require('http');
const app = require('./app');

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

const server = http.createServer(app);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
    case 'EADDRINUSE':
      console.error(`Port ${port} ${error.code === 'EACCES' ? 'requires elevated privileges' : 'is already in use'}.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  console.log(`Listening on port ${port}`);
});

server.listen(port);
