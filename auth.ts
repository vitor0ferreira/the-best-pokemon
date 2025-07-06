
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./src/lib/prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [ GitHub, Google ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
})