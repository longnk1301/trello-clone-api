import express from 'express';
import { connectDB, getDatabase } from './config/mongodb.js';
import { env } from './config/environments.js';

connectDB()
  .then(() => console.log('Connected successfully!'))
  .then(() => bootServer())
  .catch((error) => {
    console.log('ERROR', error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();
  const hostname = env.HOST_NAME;
  const port = env.PORT;

  app.get('/', (req, res) => {
    res.end('hello');
  });

  app.listen(port, hostname, () => {
    console.log(`Running at ${hostname}:${port}/`);
  });
};
