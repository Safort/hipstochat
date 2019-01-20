const { resolve } = require('path');
const staticServ = require('koa-static');
const koaBody = require('koa-body');
const router = require('../router');

const publicPath = resolve(__dirname, '../public');

module.exports = ({ app }) => {
  app
    .use((ctx, next) => {
      ctx.set('Access-Control-Allow-Credentials', true);
      ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      return next();
    })
    .use(koaBody())
    .use(staticServ(publicPath))
    .use(router.routes())
    .use(router.allowedMethods());
};
