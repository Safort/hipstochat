import methodOverride from 'method-override';
import session from 'express-session';
import bodyParser from 'body-parser';
import compression from 'compression';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import routers from '../routers';
import auth from '../auth';

export default ({ app, express }) => {
  const staticDir = './app/public';
  const MongoStore = connectMongo(session);
  const passport = auth(app);

  app.use(compression());                            // enable gzip

  app.disable('x-powered-by');

  app.use(methodOverride('X-HTTP-Method'));          // Microsoft
  app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
  app.use(methodOverride('X-Method-Override'));      // IBM

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cookieParser());

  app.use(session({
    store: new MongoStore({mongooseConnection: app.get('db')}),
    secret: 'secret_key',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 3600000 },
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/', express.static(staticDir));

  routers({ app, passport });
};
