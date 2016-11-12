import mongoose, { Schema } from 'mongoose';


const MessageSchema = new Schema({
  dialogId: Schema.Types.ObjectId,
  authorId: Schema.Types.ObjectId,
  message: String,
  date: {
    type: Date,
    default: Date.now,
  },
});


// get dialog messages by dialogId
MessageSchema.statics.getMessages = function getMessages(dialogId) {
  return new Promise((resolve, reject) => {
    this.model('message').find({ dialogId }, (err, messages) => {
      if (err) {
        reject(err);
      } else {
        resolve(messages);
      }
    });
  });
};


// create message
MessageSchema.statics.createMessage = function createMessage(messageData) {
  const { dialogId, authorId, text } = messageData;
  const MessageModel = mongoose.model('message');

  return new Promise((resolve, reject) => {
    this.model('dialog').findById(dialogId, (err) => {
      if (err) {
        reject(err);
      } else {
        // TODO: добавить проверку на существование пользователя с authorId
        // и соответствующих прав на отправку сообщения
        const newMessage = new MessageModel({
          dialogId,
          authorId,
          text,
        });

        newMessage.save((err, createdMessage) => {
          if (err) {
            reject(err);
          } else {
            resolve(createdMessage);
          }
        });
      }
    });
  });
};


export default MessageSchema;
