import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(1, 'This field is required'),
  password: z.string().min(1, 'This field is required'),
});

export type LoginSchemaFields = z.infer<typeof loginSchema>;