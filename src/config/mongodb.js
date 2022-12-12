import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from './environments.js';

const uri = env.MONGODB_URI;

export const connectDB = async () => {
  const client = await new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    await listDatabases(client);

    console.log('SUCCESSFULLY!');
  } finally {
    await client.close();
  }
};

const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases();
  console.log('----databaseList', databaseList);
  const collection = client.db('trello-clone').collection('devices');
};
