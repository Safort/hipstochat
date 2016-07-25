import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

export default function(app) {
  app.use(session({
    store: new MongoStore({ mongooseConnection: app.get('db') }),
    secret: 'secret_key',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 3600000 },
  }));
}