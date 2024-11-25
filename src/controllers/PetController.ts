import { prisma } from "@/lib/prisma"
import { Request, Response, NextFunction } from "express"
import { PetSchema } from "@/schemas/PetSchema"
import AppError from "@/errors/AppError"

class PetController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, species, size } = req.query

      const filters: { name?: object; species?: object; size?: string } = {}
      if (name) filters.name = { contains: name as string, mode: "insensitive" }
      if (species)
        filters.species = { contains: species as string, mode: "insensitive" }
      if (size) filters.size = size as string

      const petsList = await prisma.pet.findMany({
        where: filters,
      })

      return res.status(200).json(petsList)
    } catch (error) {
      next(error)
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const petData = await prisma.pet.findUnique({ where: { id } })
      if (!petData) {
        throw new AppError("Pet not found", 404)
      }
      return res.status(200).json(petData)
    } catch (error) {
      next(error)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const petData = PetSchema.omit({ id: true }).parse(req.body)

      const newPet = await prisma.pet.create({
        data: {
          ...petData,
        },
      })
      return res.status(201).json(newPet)
    } catch (error) {
      next(error)
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const petData = PetSchema.partial().omit({ id: true }).parse(req.body)

      const updatedPet = await prisma.pet.update({
        where: { id },
        data: petData,
      })

      if (!updatedPet) {
        throw new AppError("Pet not found!", 404)
      }

      return res.status(200).json(updatedPet)
    } catch (error) {
      next(error)
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      await prisma.pet.delete({ where: { id } })
      return res.status(200).json({ message: "Pet deleted successfully!" })
    } catch (error) {
      next(error)
    }
  }
}

export default PetController
