import mongoose from 'mongoose';
import config from '../../../config';

const MONGODB_URI = `${config.DB_TYPE}://${config.DB_HOST}/${config.DB_INSTANCE}`;

export const initDB = async () => {
    // Connect to MongoDB using Mongoose
    return await mongoose.connect(MONGODB_URI);
};