import UserModel from '../models/user';
import { isSignedIn } from '../utils';


export default ({ app }) => {
  app.get('/api/me', isSignedIn, (req, res) => {
    UserModel.getUserById(req.user._id).then(user => {
      res.json(user);
    });
  });


  app.put('/api/me', isSignedIn, (req, res) => {
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


  app.delete('/api/me/dialog/:dialogId', isSignedIn, (req, res) => {
    UserModel
    .removeDialogById({ userId: req.user._id, dialogId: req.params.dialogId })
    .then(() => {
      res.json({ success: true });
    })
    .catch(() => {
      res.json({ success: false });
    });
  });


  app.get('/api/users/:username', (req, res) => {
    UserModel.find(
      { username: { $regex: req.params.username } },
      'username',
      (err, userList) => {
        res.json({ userList });
      },
    );
  });
};
