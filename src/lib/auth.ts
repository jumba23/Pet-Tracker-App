import NextAuth, { NextAuthConfig } from "next-auth";

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [],
  callbacks: {},
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
