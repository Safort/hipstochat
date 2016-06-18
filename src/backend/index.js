import path from 'path';

import middleware from './middleware';
import express from 'express';
import * as config from './config';
import db from './db';

const app = express();

app.set('db', db);

middleware({app, express});

app.listen(config.server.port, config.server.host, () => {
    console.log(`
        Server is running at ${config.server.host}:${config.server.port}
    `);
});
