import { z } from "zod"

export const RoleEnum = z.enum(["ADMIN", "USER"])

export const UserSchema = z.object({
  id: z.string().uuid().optional(), // `id` é opcional pois geralmente será gerado automaticamente
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email format").max(100),
  password: z.string().min(6, "Password must have at least 6 characters"),
  role: RoleEnum.default("USER"),
  phone: z
    .string()
    .min(10, "Phone number must have at least 10 characters")
    .max(20),
  addressId: z.string().uuid().optional(), // Relacionado ao endereço se existir
})
