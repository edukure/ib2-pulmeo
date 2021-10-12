import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { connectToDatabase } from '@config/mongodb';

export default async function auth(req, res) {
  const { client } = await connectToDatabase();
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      // ...add more providers here
    ],
    adapter: MongoDBAdapter({
      db: (await client).db('pulmeo'),
    }),
    pages: {
      newUser: '/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
    },
  });
}
