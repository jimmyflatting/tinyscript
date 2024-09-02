import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    product_id: {
        type: String,
        default: null,
    },
    active: {
        type: Boolean,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    unit_amount: {
        type: Number,
        default: null,
    },
    currency: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: null,
    },
    interval: {
        type: String,
        default: null,
    },
    interval_count: {
        type: Number,
        default: null,
    },
    trial_period_days: {
        type: Number,
        default: null,
    },
    metadata: {
        type: Map,
        of: String,
        default: null,
    },
})

export default mongoose.models.Price || mongoose.model('Price', priceSchema)