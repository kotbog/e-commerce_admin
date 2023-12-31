import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI) throw new Error('There is no MONGO_URI in .env file.');

async function dbConnect () {
        mongoose.connect(MONGO_URI).then(mongoose => {
            console.log('MongoDB connected.')
            return mongoose;
        }).catch(e => console.error(e))
}

export default dbConnect