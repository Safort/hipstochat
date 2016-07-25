import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import routers from '../routers';
import auth from '../auth';
import sessions from './sessions';
import headers from './headers';


export default ({ app, express }) => {
  const staticDir = './app/public';
  const passport = auth(app);

  app.use(compression());                            // enable gzip

  headers(app);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cookieParser());

  sessions(app);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/', express.static(staticDir));

  routers({ app, passport });
};
