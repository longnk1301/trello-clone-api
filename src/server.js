import express from 'express';
import { connectDB } from './config/mongodb.js';
import { env } from './config/environments.js';

const app = express();
const hostname = env.HOST_NAME;
const port = env.PORT;

connectDB().catch(console.log);

app.get('/', (req, res) => {
  res.end('hello');
});

app.listen(port, hostname, () => {
  console.log(`Running at ${hostname}:${port}/`);
});
