import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI || 'MONGO_URI.';

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined'
    );
}

let cached = global.mongoose = { conn: null, promise: null };

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
    });
}

cached.conn = await cached.promise;
return cached.conn;
}

export default connectToDatabase;