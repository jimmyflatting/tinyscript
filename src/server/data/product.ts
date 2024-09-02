import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: null,
    },
    name: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    metadata: {
        type: Map,
        of: String,
        default: null,
    },
})

export default mongoose.models.Product || mongoose.model('Product', productSchema)