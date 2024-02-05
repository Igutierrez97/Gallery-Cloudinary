import { verify } from 'jsonwebtoken';
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token');

  console.log(token, 'este es el token');
  console.log(request);

  const body = await request.formData();
  const file = body.get('file') as File; // Explicitly type file as File
  console.log(token?.value);
  try {
    if (file) {
      const filePath = path.join(process.cwd(), 'public', file.name); // Ruta donde se guardará el archivo
      await writeFile(filePath, Buffer.from(await file.arrayBuffer())); // Use file.arrayBuffer() to get the buffer
      return new Response('Archivo guardado exitosamente', { status: 200 });
    } else {
      return new Response('No autorizado', { status: 401 });
    }
  } catch (error) {
    return new Response('Error al guardar el archivo', { status: 500 });
  }
}
