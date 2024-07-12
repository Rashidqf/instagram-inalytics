import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "instagram",
      name: "Instagram",
      credentials: {
        code: { label: "Code", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(
            `https://plugged.app/api/auth/instagram`,
            {
              code: credentials.code,
            }
          );
          const { access_token, profile } = response.data;
          return {
            id: profile.id,
            name: profile.username,
            email: null, // Instagram doesn't provide email
            image: profile.profile_picture,
            accessToken: access_token,
          };
        } catch (error) {
          console.error(
            "Error authorizing user:",
            error.response ? error.response.data : error.message
          );
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
