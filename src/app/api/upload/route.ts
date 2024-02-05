import { verify } from 'jsonwebtoken';
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { imageUploadSchema } from '../validations/image';
import { ValidationError } from 'yup';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token');

  console.log(token, 'este es el token');

  const body = await request.formData();
  const file = body.get('file') as File; // Explicitly type file as File
  console.log(file, 'este es el archivo');

  try {
      await imageUploadSchema.validate({ image: file });
    if (token && file && verify(token.value, 'secret')) {
      const filePath = path.join(process.cwd(), 'public', file.name); // Ruta donde se guardará el archivo
      await writeFile(filePath, Buffer.from(await file.arrayBuffer())); // Use file.arrayBuffer() to get the buffer
      return  NextResponse.json({ message: 'Archivo guardado' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }
  } catch (error) {
    if(error instanceof ValidationError){
      return NextResponse.json({error:error.message}, { status: 400 });
    }else{
      return NextResponse.json({error:'Error al guardar el archivo'}, { status: 500 });
    }
   
  }
}
