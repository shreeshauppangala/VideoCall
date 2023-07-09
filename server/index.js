const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');

const expressApp = express();
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());
expressApp.use(pino);

const sendTokenResponse = (token, res) => {
  res.json({ token: token.toJwt() });
};

expressApp.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.json({ greeting: `Hello ${name}!` });
});

expressApp.route('/video/token')
  .get((req, res) => {
    const { identity, room } = req.query;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
  })
  .post((req, res) => {
    const { identity, room } = req.body;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
  });

const server = app.listen(3001, () => {
  const { address, port } = server.address();
  console.log(`Express server is running on ${address}:${port}`);
});
