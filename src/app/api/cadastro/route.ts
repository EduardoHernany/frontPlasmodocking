import { error } from 'console';
import  {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import * as argon2 from 'argon2'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: NextRequest){

  try {
    const data = await req.json();
    console.log(data);

    const { nome, email, password, nome_usuario } = data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            name: nome_usuario,
          },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json({ message: "Este email já está em uso." }, { status: 400 });
      } else {
        return NextResponse.json({ message: "Este nome de usuário já está em uso." }, { status: 400 });
      }
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    

    const newUser = await prisma.user.create({
      data: {
        username: nome_usuario,
        email: email,
        password: hash,
        name: nome,
      },
    });

    //dsadasdasd
    
    return NextResponse.json({ message: "Usuário registrado com sucesso." }, { status: 201 });
    return NextResponse.json({data})

  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return NextResponse.json({ message: "Erro ao registrar usuário." }, { status: 500 });
    
  }




}