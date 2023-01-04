import express from 'express';
import cors from 'cors';
import { connectDB } from './config/mongodb.js';
import { env } from './config/environments.js';
import { apiV1 } from './routes/v1/index.js';

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

  const WHITELIST_DOMAINS = ['http://localhost:3000']

  const corsOptions = {
    origin: function (o, callback) {
      if (WHITELIST_DOMAINS.indexOf(o) !== -1) {
        callback(null, true)
      } else {
        callback(new Error(`${o} Not allowed by CORS`))
      }
    },
    optionsSuccessStatus: 200
  }

  // use options in the last phase after release product
  //app.use(cors(corsOptions))

  app.use(cors())

  //Enable req.body data
  app.use(express.json());

  //Use API V1
  app.use('/v1', apiV1);

  app.listen(port, hostname, () => {
    console.log(`Running at ${hostname}:${port}/`);
  });
};
