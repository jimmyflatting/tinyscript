import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env',
    )
}

declare global {
    var mongoose: { conn: any, promise: any } | undefined
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    cached = cached! // Add this line to assert that cached is defined
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then(mongoose => {
            console.log('Db connected')
            return mongoose
        }).catch(error => {
            console.error('Error connecting to database:', error)
            cached!.promise = null // Add non-null assertion here
            throw error
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default dbConnect