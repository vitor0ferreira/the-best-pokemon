
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./src/lib/prisma"
import GitHub from "next-auth/providers/github"


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [ GitHub ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
})