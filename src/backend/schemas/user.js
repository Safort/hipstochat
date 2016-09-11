import { Schema } from 'mongoose';
import crypto from 'crypto';


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set(pwd) {
      return crypto.createHash('sha256').update(pwd).digest('hex');
    },
  },
  name: String,
  age: String,
  sex: String,
  email: String,
  dialogs: Object,
});


// create new dialog
UserSchema.statics.createDialog = function(userId, newDialog) {
  const { dialogUserId, dialogName } = newDialog;

  return new Promise((resolve, reject) => {
    this.model('users').findById(userId, (err, user) => {
      if (err) {
        reject(err);
      } else {
        const hasDialog = user.dialogs.list
          .some(dialog => dialog.dialogUserId === dialogUserId);

        if (hasDialog) {
          reject({ error: 'duplicate' });
        } else {
          user.dialogs.list.push({ dialogUserId, dialogName });
          user.markModified('dialogs.list');
          user.save(err => {
            if (err) {
              reject(err);
            } else {
              resolve({ dialogUserId, dialogName });
            }
          });
        }
      }
    });
  });
};


// get dialogs by user id
UserSchema.statics.getDialogs = function({ userId }) {
  return new Promise((resolve, reject) => {
    this.model('users').findById(userId, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user.dialogs);
      }
    });
  });
};


// remove dialog by dialogUserId
UserSchema.statics.removeDialog = function({ userId, dialogUserId }) {
  return new Promise((resolve, reject) => {
    this.model('users').findById(userId, (err, user) => {
      if (err) {
        reject(err);
      } else {
        user.dialogs.list = user.dialogs.list
          .filter(dialog => dialog.dialogUserId !== dialogUserId);

        user.markModified('dialogs.list');
        user.save(err => {
          if (err) {
            reject(err);
          } else {
            resolve({ dialogUserId });
          }
        });
      }
    });
  });
};


export default UserSchema;
