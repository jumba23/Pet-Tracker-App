import { request } from "http";
import NextAuth, { NextAuthConfig } from "next-auth";

const config = {
  pages: {
    signIn: "/login",
  },
  //   session: {
  //     maxAge: 30 * 24 * 60 * 60,
  //     strategy: "jwt",
  //   },
  providers: [
    Credentials({
      async authorize(credentials) {
        //runs on login
        const { email, password } = credentials;

        const user = prisma?.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("User not found");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: ({ request }) => {
      //runs on every request with middleware
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      if (isTryingToAccessApp) {
        return false;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);
