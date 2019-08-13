const http = require('http');
const app = require('./app');
const config = require('./config');

const server = http.createServer(app);

// Attach server to the socket
// confugure origin socket
app.io.attach(server);
app.io.origins([config.ORIGINS]);

server.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${config.PORT}`);
});
