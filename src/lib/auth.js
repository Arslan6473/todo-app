// auth.js (or authOptions.js)
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db/prisma";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    pages: {
      signIn: '/login'
    },
    callbacks: {
      async session({ session, token, user }) {
        session.user.id = user.id;
        return session;
      },
    },
  };