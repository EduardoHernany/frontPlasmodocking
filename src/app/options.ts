import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import client from "../../prisma/client";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const options:NextAuthOptions = {

    
    providers: [
        CredentialsProvider({
            name: "Credentials",
            
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials)  {
              if(!credentials){
                return null
              }
              
             
              const user = await prisma.user.findFirst({
                where: {
                  username: credentials.username,
                  password: credentials.password,
                },
              });
      

              const usere = {username:'teste', name:user?.name,email:user?.email,password:user?.password}
              if (user) {
                // Aqui você pode retornar o usuário encontrado para ser usado na autenticação.
                // Certifique-se de retornar um objeto que corresponda à estrutura do objeto user no Prisma.
                return user;
              } else {
                return null;
              }
            }
          })
       
    ],
    adapter: PrismaAdapter(prisma),
    pages:{
        signIn:'/auth/login'
    },
    session: {
        strategy:'jwt'
    },
    
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    }

};