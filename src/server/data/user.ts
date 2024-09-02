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
      enum: ['active', 'trial', 'canceled'],
      default: 'trial',
    },
    stripe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stripe',
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
        },
    ],
})

export default mongoose.models.User || mongoose.model('User', userSchema)