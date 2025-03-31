import { z } from 'zod';

/**
 * Enum para tipos de persona
 */
export const PersonTypeEnum = z.enum(['NATURAL', 'JURIDICAL']);
export type PersonType = z.infer<typeof PersonTypeEnum>;

/**
 * Schema para el registro de usuarios
 */
export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  phone: z.string().min(10, 'Número de teléfono inválido'),
  personType: z.enum(["NATURAL", "JURIDICAL"]),
  companyName: z.string().optional(), // Solo aplica si es JURIDICAL
  ruc: z.string().optional(), // Solo aplica si es JURIDICAL
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dni: z.string().optional(),
});
export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Schema para el login de usuarios
 */
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
export type LoginInput = z.infer<typeof loginSchema>;