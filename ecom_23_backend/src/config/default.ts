import dotenv from "dotenv";

dotenv.config();

export const PaginationDefaults = {
  page: 1,
  limit: 20,
  maxLimit: 100,
};

export const securityKey = {
  saltWorkFactor: 10,
  accessTokenTtl: "7d",
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  privateKey: process.env.PRIVATE_KEY,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
};
