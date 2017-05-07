import mongoose, { Schema } from 'mongoose';


const DialogSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  participants: {
    type: Array,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
});


// create new dialog
DialogSchema.statics.createDialog = function createDialog(dialogData) {
  const { creatorId, interlocutorId, name } = dialogData;
  const DialogModel = mongoose.model('dialog');

  // TODO: переписать всё это на промисы

  return new Promise((resolve, reject) => {
    // проверяем, существует ли пользователь с таким id
    this.model('user').findById(creatorId, (err, dialogCreator) => {
      if (err) {
        reject(err);
      } else {
        // создаём новый диалог
        const newDialog = new DialogModel({
          creatorId,
          participants: [creatorId, interlocutorId],
          name,
        });

        // сохраняем новый диалог
        newDialog.save((err, createdDialog) => {
          if (err) {
            reject(err);
          } else {
            // сохраняем новый диалог в список диалогов пользователя
            dialogCreator.dialogs.push({ id: createdDialog._id, name });
            dialogCreator.save(err => {
              if (err) {
                reject(err);
              } else {
                // теперь сохраняем этот же диалог в список диалогов собеседника
                this.model('user')
                .findById(interlocutorId, (err, dialogInterlocutor) => {
                  if (err) {
                    reject(err);
                  } else {
                    dialogInterlocutor.dialogs.push({
                      id: createdDialog._id,
                      name: dialogCreator.username,
                    });
                    dialogInterlocutor.save(err => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(createdDialog);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
};


// get dialogs by user id
DialogSchema.statics.getDialogs = function getDialogs({ creatorId }) {
  return new Promise((resolve, reject) => {
    this.model('dialog').find({ creatorId }, (err, dialogs) => {
      if (err) {
        reject(err);
      } else {
        resolve(dialogs);
      }
    });
  });
};


// remove dialog by dialogId
DialogSchema.statics.removeDialog = function removeDialog({ creatorId, dialogId }) {
  return new Promise((resolve, reject) => {
    this
    .model('dialog')
    .findOneAndRemove({ _id: dialogId, creatorId }, err => {
      if (err) {
        reject(err);
      } else {
        resolve({ creatorId, dialogId });
      }
    });
  });
};


export default DialogSchema;
