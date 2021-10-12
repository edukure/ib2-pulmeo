// adaptado de:
// https://blog.rocketseat.com.br/criando-um-blog-com-contador-de-visitas-usando-nextjs-e-mongodb/
// com adição do typing do DbConnection e da função connectToDatabase

import { MongoClient, Db } from 'mongodb';

interface DbConnection {
  client: MongoClient;
  db: Db;
}

// sobre variáveis de ambiente
// https://nextjs.org/docs/basic-features/environment-variables
let uri = process.env.DATABASE_URL || ''; // trick ts :(
let dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient = null;
let cachedDb: Db = null;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

/*
 * Retorna uma nova conexão caso não exista. Caso exista, retorna a conexão já aberta (cached)
 */
export async function connectToDatabase(): Promise<DbConnection> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
