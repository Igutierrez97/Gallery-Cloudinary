import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { LoginInterfaces } from '@/interfaces/login-interfaces';

export async function POST(request: Request, response: Response) {
  const { email, password }: LoginInterfaces = await request.json();

  if (email === 'Josue@uci.cu' && password === '1234') {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        email,
      },
      'secret'
    );
    const serializedToken = serialize('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60,
      path: '/',
    });

    const newHeaders = new Headers(response.headers);
    newHeaders.set('Set-Cookie', serializedToken);

    return NextResponse.json(
      { message: 'Login successful' },
      { status: 200, headers: newHeaders }
    );
  }

  return NextResponse.json({ error: 'Login failed' }, { status: 401 });
}
