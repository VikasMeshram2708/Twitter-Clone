/* eslint-disable @typescript-eslint/ban-ts-comment */
import { prismaInstance } from "@/lib/prismaInstance";
import NextAuth, { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Auth configuration
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/user/login",
    newUser: "/user/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const user = await prismaInstance.user.findFirst({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return {
            id: user.id,
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
            throw new Error("Database error occurred");
          }
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // @ts-ignore
        token.username = user.username;
        token.expires = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          username: token.username,
        },
        expires: new Date((token.expires as number) * 1000).toISOString(),
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
};

// Create handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
