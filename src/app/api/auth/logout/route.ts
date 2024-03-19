import { NextResponse, NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function GET(request: NextRequest, response: NextResponse) {
  const cookie = request.cookies.get('token');

  if (!cookie?.value) {
    return NextResponse.json({ message: 'No Token' }, { status: 401 });
  }

  try {
    verify(cookie.value, `${process.env.SECRET_kEY}`);
    const serializedToken = serialize('token', '', {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Set-Cookie', serializedToken);
    return NextResponse.json(
      { message: 'Logout' },
      { status: 200, headers: newHeaders }
    );
  } catch (error) {
    return NextResponse.json({ message: 'No Token' }, { status: 401 });
  }
}
