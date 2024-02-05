import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from './app/api/validations/register';
import { ValidationError } from 'yup';
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
  
}
