import dbConnect from "@/server/config/db";
import UserModel from "@/server/data/user";
import StripeModel from "@/server/data/stripe";
import { User } from "@/lib/types";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const getAllUsers = async () => {
    await dbConnect();

    try {
        return await UserModel.find();
    } catch (error) {
        console.error("Error getting all users:", error);
        throw error;
    }
}

export const getUser = async (id: string) => {
    await dbConnect()
    
    try {
        return await UserModel.findOne({ clerkId: id });
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
}
 
export const createUser = async (data: User) => {
    await dbConnect();
    
    try {
        // Create a new customer in Stripe
        const customer = await stripe.customers.create({
            email: data.email,
            name: data.full_name,
        });

        // Create the Stripe document
        const stripeDoc = await StripeModel.create({
            user: customer.id,  // Use the Stripe customer ID directly
            status: 'trial',
            metadata: {},
            price_id: null,
            quantity: null,
            cancel_at_period_end: false,
        });

        // Create the user document
        const user = await UserModel.create({
            ...data,
            stripe: stripeDoc._id,  // Reference the Stripe document
        });
        
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const updateUser = async (id: string, data: User) => {
    await dbConnect();
    
    try {
        return await UserModel.findOneAndUpdate({ clerkId: id }, data, { new: true });
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export const deleteUser = async (id: string) => {
    await dbConnect();
    
    try {
        return await UserModel.findOneAndDelete({ clerkId: id });
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}