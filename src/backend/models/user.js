import mongoose, {Schema} from 'mongoose';
import UserSchema from '../schemas/user';

export default mongoose.model('users', UserSchema);
