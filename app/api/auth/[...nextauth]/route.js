import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/app/libs/mongoClient";

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
          }),
    ],
    adapter: MongoDBAdapter(clientPromise),
}

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };