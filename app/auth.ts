import { envConfig } from "@/config/env-config";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { AppSession } from "@/app/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";

const { secret } = envConfig.auth;
const { google } = envConfig.authProviders;

const nextConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  secret: secret,
  trustHost: true,
  providers: [
    Credentials({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
      },
      async authorize(credentials, request) {
        const { email, password } = credentials;
        if (!email || !password) return null;
        const user = await prisma.user.findUnique({
          where: { email: email as string },
        });
        if (!user?.password) return null;

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password,
        );
        return passwordsMatch ? user : null;
      },
    }),
    Google({
      clientId: google.clientId,
      clientSecret: google.clientSecret,
      issuer: google.issuer,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Runs on signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }): Promise<AppSession> {
      // Expose to client / server
      const appSession = session as AppSession;
      appSession.accessToken = token.accessToken as string;
      return appSession;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(nextConfig);
