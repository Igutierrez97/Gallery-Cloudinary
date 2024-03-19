import { object, mixed } from 'yup';

interface FileObject {
  type: string;
  size: number;
  name: string;
  lastModified: number;
  // Other file properties
}

export const imageUploadSchema = object({
  image: mixed()
    .test('fileType', 'Tipo de archivo no válido', (value) => {
      if (!value) {
        return false;
      }
      const fileValue = value as FileObject; // Type assertion
      return fileValue.type === 'image/jpeg' || fileValue.type === 'image/png';
    })
    .test('fileSize', 'La imagen es muy grande', (value) => {
      if (!value) {
        return false;
      }
      const fileValue = value as FileObject; // Type assertion
      return fileValue.size <= 20 * 1024 * 1024; // 20MB
    }),
});
