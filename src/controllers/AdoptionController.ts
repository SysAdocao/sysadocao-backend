import { prisma } from "@/lib/prisma"
import { Request, Response, NextFunction } from "express"
import AppError from "@/errors/AppError"
import { AdoptionSchema } from "@/schemas/AdoptionSchema"

class AdoptionController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { petId, userId } = AdoptionSchema.parse(req.body)

      const pet = await prisma.pet.findUnique({ where: { id: petId } })
      const user = await prisma.user.findUnique({ where: { id: userId } })

      if (!pet) {
        throw new AppError("Pet not found!", 404)
      }
      if (!user) {
        throw new AppError("User not found!", 404)
      }

      const adoption = await prisma.adoption.create({
        data: {
          petId,
          userId,
          adoptionDate: new Date(),
        },
      })
      return res.status(201).json(adoption)
    } catch (error) {
      next(error)
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const adoptions = await prisma.adoption.findMany()
      return res.status(200).json(adoptions)
    } catch (error) {
      next(error)
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const adoption = await prisma.adoption.findUnique({
        where: { id },
      })

      if (!adoption) {
        throw new AppError("Adoption record not found!", 404)
      }

      return res.status(200).json(adoption)
    } catch (error) {
      next(error)
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const adoption = await prisma.adoption.delete({
        where: {
          id,
        },
      })

      if (!adoption) {
        throw new AppError("Adoption record not found!", 404)
      }

      return res
        .status(200)
        .json({ message: "Adoption record deleted successfully!" })
    } catch (error) {
      next(error)
    }
  }
}

export default AdoptionController
