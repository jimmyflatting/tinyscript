import mongoose from "mongoose";

const stripeSchema = new mongoose.Schema({
    user: {
        type: String,  // Change this from ObjectId to String
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'trial', 'canceled'],
        default: 'trial',
    },
    metadata: {
        type: Map,
        of: String,
    },
    price_id: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    cancel_at_period_end: {
        type: Boolean,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    current_period_start: {
        type: Date,
        default: Date.now,
    },
    current_period_end: {
        type: Date,
        default: Date.now,
    },
    ended_at: {
        type: Date,
    },
    cancel_at: {
        type: Date,
    },
    canceled_at: {
        type: Date,
    },
    trial_start: {
        type: Date,
    },
    trial_end: {
        type: Date,
    },
})

export default mongoose.models.StripeModel || mongoose.model('StripeModel', stripeSchema)