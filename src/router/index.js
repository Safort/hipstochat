const Router = require('koa-router');
const contact = require('./contact');
const message = require('./message');
const auth = require('./auth');
const user = require('./user');

const router = new Router();

[
  user,
  contact,
  message,
  auth
].forEach(route => route({ router }));

module.exports = router;
