import { z } from 'zod';

export const orgNameValidation = z
  .string()
  .min(10, 'Username must be at least 10 characters')
  .max(200, 'Username must be no more than 200 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const orgSignUpSchema = z.object({
  orgName: orgNameValidation,
  orgType: z.string(),

  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
