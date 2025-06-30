import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? ""
    }),
  ],

  session: {
    strategy: "database",
  },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}