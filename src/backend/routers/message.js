import MessageModel from '../models/message';
import { isSignedIn } from '../utils';


export default ({ app }) => {
  // получить все сообщения из диалога
  app.get('/api/dialog/:dialogId/messages', isSignedIn, (req, res) => {
    // /api/dialog/58251f0379117d4d6e5117ec/messages
    const { dialogId } = req.params;

    console.log('test', dialogId, text);

    MessageModel
    .getMessages({ dialogId })
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
    const { authorId, text } = req.body;

    // req.user._id

    MessageModel
    .createMessage({ authorId, dialogId, text })
    .then(list => {
      res.json({ success: true });
    })
    .catch(error => {
      res.json({ success: false, error });
    });
  });
};
