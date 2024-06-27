// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "@/model/instagramModel";
import dbConnect from "@/utils/dbconnect";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (credentials) => {
        const user = await User.findOne({ instagramId: credentials.user_id });
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(dbConnect),
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.instagramId = user.instagramId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.instagramId = token.instagramId;
      return session;
    },
  },
});
