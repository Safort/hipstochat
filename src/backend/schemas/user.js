import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';
import '../models/dialog';


const dialogModel = mongoose.model('dialog');
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
});


UserSchema.statics.getUserById = function getUserById(userId) {
  return new Promise((resolve, reject) => {
    this.model('user').findById(userId, (err, user) => {
      if (err) {
        reject(err);
      } else {
        dialogModel
        .getDialogs({ creatorId: userId })
        .then(dialogs => {
          resolve({
            ...user._doc,
            dialogs: { list: dialogs },
          });
        })
        .catch(err => {
          reject(err);
        });
      }
    });
  });
};


// get dialog messages by dialogUserId
UserSchema.statics.getMessages = function getMessages({ userId, dialogUserId }) {
  return new Promise((resolve, reject) => {
    this.model('user').findById(userId, (err, user) => {
      if (err) {
        reject(err);
      } else {
        /* eslint no-param-reassign: 0 */
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
