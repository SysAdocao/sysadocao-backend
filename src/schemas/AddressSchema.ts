import { z } from "zod"

export const AddressSchema = z.object({
  id: z.string().uuid().optional(), // `id` é opcional pois geralmente será gerado automaticamente
  street: z.string().min(1, "Street is required"),
  number: z.string().min(1, "Number is required"),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State must have at least 2 characters"),
  zipCode: z.string().regex(/^\d{5}-\d{3}$/, "Invalid zip code format"),
  complement: z.string().max(100).optional(),
})
