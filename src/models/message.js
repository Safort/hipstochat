import mongoose from 'mongoose';
import MessageSchema from '../schemas/message';


export default mongoose.model('message', MessageSchema);
