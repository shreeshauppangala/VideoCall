const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');

const app = express();
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const sendTokenResponse = (token, res) => {
  res.json({ token: token.toJwt() });
};

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.json({ greeting: `Hello ${name}!` });
});

app.route('/video/token')
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
