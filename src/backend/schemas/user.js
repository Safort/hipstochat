import {Schema} from 'mongoose';

const UserSchema = new Schema({
    username: String,
    password: String,
    name: String,
    age: String,
    sex: String,
    email: String
});

export default UserSchema;
