import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: [
        {
            role: {
                type: String,
                enum: ['user', 'assistant'],
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
        },
    ],
})

export default mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema)
