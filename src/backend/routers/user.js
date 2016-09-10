import UserModel from '../models/user';
import { isSignedIn } from '../utils';


export default ({ app }) => {
  app.get('/api/user', isSignedIn, (req, res) => {
    UserModel.findById(req.user._id, (err, userInfo) => {
      res.json(userInfo);
    });
  });


  app.put('/api/user', isSignedIn, (req, res) => {
    const conditions = { _id: req.user._id };
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;

    const update = { username, name, email };
    const options = { multi: false };

    UserModel.update(conditions, update, options, err => {
      if (err) {
        res.json({ success: false });
      } else {
        res.json({ success: true });
      }
    });
  });


  app.get('/api/users/:username', (req, res) => {
    UserModel.find(
      { username: { $regex: req.params.username } },
      'username',
      (err, userList) => {
        res.json({ userList });
      });
  });
};
