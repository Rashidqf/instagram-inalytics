import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "@/model/instagramModel";
import dbConnect from "@/utils/dbconnect";
import clientPromise from "@/utils/mongodb";
import InstagramProvider from "next-auth/providers/instagram";

export default NextAuth({
  providers: [
    InstagramProvider({
      clientId: "1175082610605703",
      clientSecret: "9aa6ff4793844085505fc4338b09c7f2",
      authorization: {
        params: {
          redirect_uri: "https://plugged.app/auth/signin",
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: "process.env.NEXTAUTH_SECRET",
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
});
