import mongoose from 'mongoose';
import * as config from './config';

mongoose.connect(config.db.uri);


export default mongoose.connection;
