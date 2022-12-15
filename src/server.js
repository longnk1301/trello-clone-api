import express from 'express';
import { connectDB } from './config/mongodb.js';
import { env } from './config/environments.js';
import { BoardModel } from './models/board.model.js';

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

  app.get('/add-board', async (req, res) => {
    const dummyData = {
      title: 'Add dummy data',
    };

    await BoardModel.create(dummyData);
    res.end('Add dummy data');
  });

  app.listen(port, hostname, () => {
    console.log(`Running at ${hostname}:${port}/`);
  });
};
