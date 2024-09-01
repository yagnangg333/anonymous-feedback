import { z } from 'zod';

// export const orgNameValidation = z
//   .string()
//   .min(10, 'Username must be at least 10 characters')
//   .max(200, 'Username must be no more than 200 characters')
//   .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

// export const orgSignUpSchema = z.object({
//   orgName: orgNameValidation,
//   orgType: z.string(),

//   email: z.string().email({ message: 'Invalid email address' }),
//   password: z
//     .string()
//     .min(6, { message: 'Password must be at least 6 characters' }),
// });

export const orgSignUpSchema = z.object({
  orgName: z.string().min(2, { message: "Organization name is required" }),
  orgType: z.enum(['School', 'Tech Company', 'Hospital', 'Non-Profit', 'Government', 'Corporate', 'Other']),
  email: z.string().email({ message: "Valid email is required" }),
  contactNumber: z.string().min(10, { message: "Contact number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  password: z.string().min(6, { message: "Password should be at least 6 characters long" }),
  website: z.string().optional(),
});