import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        if (!credentials) {
          return null;
        }
        
        
        const email = credentials.name;

        
          const user = await prisma.user.findUnique({
            where: {
              username: email,
            },
          });
          await prisma.$disconnect();
          
          if (!user) {
            console.log('usuário nulo');
            return null;
          }

          const passwordMatches = await bcrypt.compare(credentials.password, user.password);

          if (passwordMatches && user.username === credentials.name) {
            console.log('senha correta');
            return user;
          } else {
            console.log('senha errada');
            return null;
          }
        
      }
    })
  ],
  callbacks: {
    async session({ session }) {

      // Verifique se o usuário foi retornado da função 'authorize' e adicione as informações dele à sessão
      if (session.user && session.user.name && session.user.email) {
        const user = await prisma.user.findFirst({
          where: {
            name: session.user.name,
            email: session.user.email,
          }
        });

        await prisma.$disconnect();

        if (user) {
          session.user = {
            ...session.user,
            role: user.role,
            username: user.username
          };
          
        }
      }
      return session;
    },
  },
  
  pages: {
    signIn: 'http://localhost:3000/auth/login'
  },
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  }
};


// Use type augmentation para adicionar a propriedade 'role' ao objeto de sessão
declare module "next-auth" {
  interface Session {
    user?: {
      username?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
      role?: string | null | undefined;
    };
  }
}
