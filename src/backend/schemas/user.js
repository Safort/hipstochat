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
});

export default UserSchema;
