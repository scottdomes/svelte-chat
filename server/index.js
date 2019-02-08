import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import setUpSockets from './sockets';

const app = express();
app.use(bodyParser.json());
app.use(cors());
const server = createServer(app);

const start = async () => {
  const client = await MongoClient.connect('mongodb://localhost/realtime');
  const db = client.db('realtime');
  setUpSockets(server, db);

  server.listen(3000, () => {
    console.log('Listening at port', server.address().port);
  });
};

start();
