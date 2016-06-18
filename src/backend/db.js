import * as config from './config';
import mongoose from 'mongoose';

mongoose.connect(config.db.uri);

export default mongoose.connection;
