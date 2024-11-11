import { z } from "zod"

export const AdoptionSchema = z.object({
  id: z.string().uuid().optional(), // `id` é opcional pois geralmente será gerado automaticamente
  adoptionDate: z.date().default(new Date()),
  petId: z.string().uuid().min(1, "Pet ID is required"),
  userId: z.string().uuid().min(1, "User ID is required"),
})
