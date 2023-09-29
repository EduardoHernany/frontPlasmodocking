import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Recupere todos os usuários do banco de dados usando o Prisma
    const users = await prisma.user.findMany();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Erro: ', error);
    return NextResponse.json({ message: 'Erro ao buscar usuários' }, { status: 500 });
  } finally {
    // Certifique-se de fechar a conexão com o Prisma após o uso
    await prisma.$disconnect();
  }
}
