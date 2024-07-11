import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "@/model/instagramModel";
import dbConnect from "@/utils/dbconnect";
import clientPromise from "@/utils/mongodb";

export const authOption = {
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
};

export default NextAuth(authOption);
