import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "@/model/instagramModel";
import dbConnect from "@/utils/dbconnect";
import clientPromise from "@/utils/mongodb";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        instagramId: { label: "Instagram ID", type: "text" },
      },
      authorize: async (credentials) => {
        await dbConnect();

        const user = await User.findOne({
          instagramId: credentials.instagramId,
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.instagramId = user.instagramId;
        token.accessToken = user.accessToken;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.instagramId = token.instagramId;
      session.user.accessToken = token.accessToken;
      session.user.username = token.username;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
