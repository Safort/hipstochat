import UserModel from '../models/user';
import { isSignedIn } from '../utils';


export default ({ app }) => {
  // получить диалоги пользователя
  app.get('/api/dialogs', isSignedIn, (req, res) => {
    UserModel
    .getDialogs({ userId: req.user._id })
    .then(dialogs => {
      res.json({ success: true, dialogs });
    })
    .catch(err => {
      res.json({ success: false, err });
    });
  });


  // добавить новый диалог
  app.post('/api/dialogs', isSignedIn, (req, res) => {
    const { dialogUserId, dialogName } = req.body;

    UserModel
    .createDialog(req.user._id, { dialogUserId, dialogName })
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      res.json({ success: false });
    });
  });


  // удалить диалог
  app.delete('/api/dialogs/:dialogUserId', isSignedIn, (req, res) => {
    const { dialogUserId } = req.params;
    const userId = req.user._id;

    UserModel
    .removeDialog({ userId, dialogUserId })
    .then(() => {
      res.json({ success: true, dialogUserId });
    })
    .catch(() => {
      res.json({ success: false });
    });
  });
};
