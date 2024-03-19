import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from './app/api/validations/register';
import { ValidationError } from 'yup';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth/register')) {
    const body = await request.json();
    try {
      await registerSchema.validate(body);
      return NextResponse.next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      } else {
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        );
      }
    }
  }

  if (request.nextUrl.pathname.includes('/admin')) {
    const token = request.cookies.get('token');
    if (token === undefined) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const payload = await jwtVerify(
        token.value,
        new TextEncoder().encode(`${process.env.SECRET_kEY}`)
      );
      console.log(payload, 'payload', `${process.env.SECRET_kEY}`);
      NextResponse.next();
    } catch (error) {
    
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}
