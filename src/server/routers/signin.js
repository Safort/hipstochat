import UserModel from '../models/user';


export default ({ app, passport }) => {
  app.post('/api/signin', passport.authenticate('local-signin'), (req, res) => {
    UserModel.getUserById(req.user._id).then(user => {
      res.json(user);
    });
  });


  app.get('/api/signout', (req, res) => {
    req.logout();

    if (req.user) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });


  app.get('/api/signin-error', (req, res) => {
    res.json({
      success: false,
      data: 'authorization is not successful',
    });
  });
};
