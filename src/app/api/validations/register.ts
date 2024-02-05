import { object, string } from 'yup';

export const registerSchema = object({
  email: string().email().required(),
  password: string().required(),
});
