import { verify } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { imageUploadSchema } from '../validations/image';
import { ValidationError } from 'yup';

import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { prisma } from '@/libs/prisma';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token');
  const body = await request.formData();
  const file = body.get('file') as File; // Explicitly type file as File

  try {
    await imageUploadSchema.validate({ image: file });
    if (token && file && verify(token.value, `${process.env.SECRET_kEY}`)) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const response: UploadApiResponse | UploadApiErrorResponse | undefined =
        await new Promise<
          UploadApiErrorResponse | undefined | UploadApiResponse
        >((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: 'auto',
                public_id: file.name,
                folder: 'galeria-pablo',
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            )
            .end(buffer);
        });
      if (response) {
        await prisma.imagenes.create({
          data: {
            url: response.secure_url,
          },
        });
      }
      return NextResponse.json(
        { message: 'Archivo guardado' },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: 'Error al guardar el archivo' },
        { status: 500 }
      );
    }
  }
}
