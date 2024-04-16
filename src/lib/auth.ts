import NextAuth, { NextAuthConfig } from "next-auth";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";

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

        // get user from db
        const user = await prisma?.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("User not found");
          return null;
        }

        // compare passwords using bcrypt
        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordsMatch) {
          console.log("Invalid Credentials");
          return null;
        }
        return user;
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
