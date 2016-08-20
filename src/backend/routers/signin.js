import UserModel from '../models/user';

export default ({ app, passport }) => {
  app.post('/api/signin', passport.authenticate('local-signin'), (req, res) => {
    UserModel.findById(req.session.passport.user, (err, userInfo) => {
      res.json(userInfo);
    });
  });

  app.get('/api/signout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/signin-error', (req, res) => {
    res.json({
      success: false,
      data: 'authorization is not successful',
    });
  });
};
