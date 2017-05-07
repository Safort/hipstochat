import DialogModel from '../models/dialog';
import { isSignedIn } from '../utils';


export default ({ app }) => {
  // получить диалоги пользователя
  app.get('/api/dialogs', isSignedIn, (req, res) => {
    DialogModel
    .getDialogs({ creatorId: req.user._id })
    .then(dialogs => {
      res.json({ success: true, dialogs });
    })
    .catch(err => {
      res.json({ success: false, err });
    });
  });


  // добавить новый диалог
  app.post('/api/dialogs', isSignedIn, (req, res) => {
    const { interlocutorId, name } = req.body;
    const creatorId = req.user._id;

    DialogModel
    .createDialog({ creatorId, interlocutorId, name })
    .then(() => {
      res.json({ success: true });
    })
    .catch(error => {
      res.json({ success: false, error });
    });
  });


  // удалить диалог
  app.delete('/api/dialogs/:dialogId', isSignedIn, (req, res) => {
    const { dialogId } = req.params;
    const creatorId = req.user._id;

    DialogModel
    .removeDialog({ creatorId, dialogId })
    .then(() => {
      res.json({ success: true, dialogId });
    })
    .catch(error => {
      res.json({ success: false, error });
    });
  });
};
