'use server';

import dbConnect from "@/server/config/db";
import User from "@/server/data/user";
import ConversationModel from "@/server/data/item";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function getConversations(clerkId: string) {
    await dbConnect();
    const user = await User.findOne({ clerkId }).lean() as { _id: string } | null;
    if (!user) return [];
    return await ConversationModel.find({ userId: user._id }).lean();
}

export async function createMessage(clerkId: string, content: string, conversationId?: string) {
    await dbConnect();
    
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error("User not found");

    if (!user.available_tokens || user.available_tokens <= 0) {
        throw new Error("User has no available tokens");
    }

    let conversation;
    if (conversationId) {
        conversation = await ConversationModel.findById(conversationId);
    } else {
        conversation = new ConversationModel({ userId: user._id, messages: [] });
    }

    if (!conversation) throw new Error("Conversation not found");

    // Add user message
    conversation.messages.push({ role: 'user', content });

    // Get AI response
    const input = {
        prompt: content,
        max_new_tokens: 512,
        prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
        system_prompt: process.env.SYSTEM_PROMPT
    };

    let aiResponse = '';

    if (user.subscription == "trial" || user.subscription == "starter") {
        for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", { input })) {
            aiResponse += event;
        };
    } else if (user.subscription == "plus") {
        for await (const event of replicate.stream("meta/meta-llama-3-70b-instruct", { input })) {
            aiResponse += event;
        };
    } else if (user.subscription == "pro") {
        for await (const event of replicate.stream("meta/meta-llama-3.1-405b-instruct", { input })) {
            aiResponse += event;
        };
    } else {
        throw new Error("User is not subscribed to TinyScript.");
    }

    conversation!.messages.push({ role: 'assistant', content: aiResponse });

    await conversation!.save();

    // Deduct tokens from user
    user.available_tokens -= 1;
    await user.save();

    return {
        conversationId: conversation!._id,
        userMessage: content,
        aiMessage: aiResponse
    };
}

export async function deleteConversation(conversationId: string) {
    await dbConnect();
    await ConversationModel.findByIdAndDelete(conversationId);
}