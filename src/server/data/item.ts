import mongoose, { Schema, model, Model } from 'mongoose';

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  userId: mongoose.Types.ObjectId;
  messages: Message[];
}

const MessageSchema = new Schema<Message>({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
});

const ConversationSchema = new Schema<Conversation>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [MessageSchema],
});

// Check if the model already exists before creating a new one
const ConversationModel: Model<Conversation> = mongoose.models.Conversation || model<Conversation>('Conversation', ConversationSchema);

export default ConversationModel;