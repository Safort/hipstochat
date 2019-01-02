import Koa from 'koa';
import db from './db';
import middleware from './middleware';
import config from './config';

const { host, port } = config.server;
const app = new Koa();

middleware({ app });

db.connect()
  .then(() => {
    app.context.db = db;
    app.listen(port, host, () => {
      console.log(`\n Started on http://${host}:${port} \n`);
    });
  })
  .catch(err => {
    console.log(err);
  });
