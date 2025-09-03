import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify email guilds" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const t = token as JWT & { accessToken?: string; tokenType?: string };
      if (account) {
        t.accessToken = account.access_token as string | undefined;
        t.tokenType = account.token_type as string | undefined;
      }
      return t;
    },
    async session({ session, token }) {
      const t = token as JWT & { accessToken?: string };
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      (session as typeof session & { accessToken?: string }).accessToken = t.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
