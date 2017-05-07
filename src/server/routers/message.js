import MessageModel from '../models/message';
import { isSignedIn } from '../utils';


export default ({ app }) => {
  // получить все сообщения из диалога
  app.get('/api/dialog/:dialogId/messages', isSignedIn, (req, res) => {
    const { dialogId } = req.params;

    MessageModel
    .getMessages(dialogId)
    .then(list => {
      res.json({ success: true, list });
    })
    .catch(error => {
      res.json({ success: false, error });
    });
  });


  // отправить сообщение
  app.post('/api/dialog/:dialogId/message', isSignedIn, (req, res) => {
    const { dialogId } = req.params;
    const { text } = req.body;

    MessageModel
    .createMessage({ authorId: req.user._id, dialogId, text })
    .then(message => {
      res.json({ success: true, message });
    })
    .catch(error => {
      res.json({ success: false, error });
    });
  });
};
