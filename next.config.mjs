/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE: process.env.DATABASE,
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    SYSTEM_PROMPT: process.env.SYSTEM_PROMPT,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  },
};

export default nextConfig;
