import UserModel from '../models/user';
import { isSignedIn } from '../utils';


export default ({ app }) => {
  // получить все сообщения из диалога
  app.get('/api/dialogs/:dialogUserId/messages', isSignedIn, (req, res) => {
    const { dialogUserId } = req.params;

    UserModel
    .getMessages({ userId: req.user._id, dialogUserId })
    .then(list => {
      res.json({ success: true, list });
    })
    .catch(error => {
      res.json({ success: false, error });
    });
  });
};
