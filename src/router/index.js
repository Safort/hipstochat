const Router = require('koa-router');

const dialog = require('./dialog');
const message = require('./message');
const auth = require('./auth');
const user = require('./user');

const router = new Router();

[
  user,
  dialog,
  message,
  auth
].forEach(route => route({ router }));

module.exports = router;
