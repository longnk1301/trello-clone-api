import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  HOST_NAME: process.env.HOST_NAME,
  PORT: process.env.PORT,
  DATABASE_NAME: process.env.DATABASE_NAME
};
