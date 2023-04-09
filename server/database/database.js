import MongoDb, {
  MongoClient,
  MongoServerSelectionError,
  ServerApiVersion,
} from 'mongodb';
import { config } from '../config.js';

const uri = config.db.host;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let db;

export async function connectDB() {
  await client.connect();
  await client.db().command({ ping: 1 });
  console.log('Pinged your deployment. You successfully connected to MongoDB!');

  db = client.db();
}

export function getUsers() {
  return db.collection('users');
}

export function getTweets() {
  return db.collection('tweets');
}
