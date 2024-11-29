import { z } from "zod"

export const StatusEnum = z.enum(["AVAILABLE", "ADOPTED"])
export const SizeEnum = z.enum(["SMALL", "MEDIUM", "BIG"])

export const PetSchema = z.object({
  id: z.string().uuid().optional(), // `id` é opcional pois geralmente será gerado automaticamente
  name: z.string().min(1, "Name is required"),
  species: z.string().min(1, "Species is required"),
  birthDate: z.date().default(new Date()),
  description: z.string().min(1, "Description is required"),
  size: SizeEnum,
  isVacinated: z.boolean().default(false),
  isCastrated: z.boolean().default(false),
  imageUrl: z.string().optional(),
  status: StatusEnum.default("AVAILABLE"),
})
