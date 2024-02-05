import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { hashSync } from 'bcrypt';

export async function POST(request: Request) {
  const data = await request.json();
  const { email, password } = data;

  try {
    const existEmail = await prisma.users.findUnique({ where: { email } });
    if (existEmail) {
      return NextResponse.json({ error: 'User already exist' });
    }
    const cryptpassw = hashSync(password, 10);
    const user = await prisma.users.create({
      data: { email, password: cryptpassw },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Lok the log' }, { status: 400 });
  }
}
