import NextAuth, { NextAuthOptions } from "next-auth";
import { options } from "../../../../service/options";
 
const handler = NextAuth(options);

export {handler as GET, handler as POST}