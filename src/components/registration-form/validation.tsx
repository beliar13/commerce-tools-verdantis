import { z } from 'zod';

export const registrationSchema = z.object({
  checkbox: z.boolean(),
  dateOfBirth: z
    .string()
    .date()
    .refine((value) => {
      const currentDate = new Date();
      const userDateOfBirth = new Date(value);
      const userAge = currentDate.getFullYear() - userDateOfBirth.getFullYear();
      return userAge >= 13;
    }, 'User must be at least 13 years old'),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().refine((password) => password.length >= 8, {
    message: 'Your password cannot be less than 8 characters',
  }),
});

export type RegistrationInfo = z.infer<typeof registrationSchema>;
