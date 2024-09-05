import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    subscription_status: {
      type: String,
      enum: ['trial', 'starter', 'plus', 'pro'],
      default: 'trial',
    },
    available_tokens: {
      type: Number,
      default: 10,
    },
    stripe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stripe',
    },
    conversations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
        },
    ],
})

export default mongoose.models.User || mongoose.model('User', userSchema)