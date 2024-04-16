import NextAuth, { NextAuthConfig } from "next-auth";
import { config } from "process";

export const { auth } = NextAuth(config);

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [],
} satisfies NextAuthConfig;
