import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from './environments.js';

const uri = env.MONGODB_URI;
const databaseName = env.DATABASE_NAME;

let dbInstance = null;

export const connectDB = async () => {
  const client = await new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  await client.connect();

  dbInstance = client.db(databaseName);
};

export const getDatabase = () => {
  if (!dbInstance) throw new Error('Must connect to Database!');

  return dbInstance;
};
