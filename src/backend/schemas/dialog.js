import mongoose, { Schema } from 'mongoose';


const DialogSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  interlocutorId: {
    type: Schema.Types.ObjectId,
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

  return new Promise((resolve, reject) => {
    this.model('user').findById(creatorId, err => {
      if (err) {
        reject(err);
      } else {
        // is dialog exist?
        this.find({ creatorId, interlocutorId }, (err, data) => {
          if (err) {
            reject(err);
          } else if (data.length === 0) {
            const newDialog = new DialogModel({
              creatorId,
              interlocutorId,
              name,
            });

            newDialog.save((err, createdDialog) => {
              if (err) {
                reject(err);
              } else {
                resolve(createdDialog);
              }
            });
          } else {
            reject('duplicate');
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


// remove dialog by dialogUserId
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
