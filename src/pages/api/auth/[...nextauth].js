import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

export const authOptions = {
  providers: [
    InstagramProvider({
      clientId: "1175082610605703",
      clientSecret: "9aa6ff4793844085505fc4338b09c7f2",
      authorization: {
        params: {
          scope: "user_profile,user_media",
          redirect_uri: "https://plugged.app/auth/signin",
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: null, // Instagram doesn't provide email
          image: profile.profile_picture,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    store: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
