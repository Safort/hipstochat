import middleware from './middleware';
import express from 'express';
import * as config from './config';
import db from './db';

const app = express();
const port = config.server.port;
const host = config.server.host;

app.set('db', db);

middleware({ app, express });

app.listen(port, host, () => {
  console.log(`Server is running at ${host}:${port}`);
});
