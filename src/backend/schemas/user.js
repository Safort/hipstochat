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
  dialogs: [],
});


UserSchema.statics.getUserById = function getUserById(userId) {
  return new Promise((resolve, reject) => {
    this.model('user').findById(userId, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};


UserSchema.statics.removeDialogById = function removeDialogById({ userId, dialogId }) {
  return new Promise((resolve, reject) => {
    this.model('user').findById(userId, (err, user) => {
      if (err) {
        reject(err);
      } else {
        user.dialogs = user.dialogs.filter(({ id }) => {
          return id.toString() !== dialogId;
        });
        user.save(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
};


export default UserSchema;
