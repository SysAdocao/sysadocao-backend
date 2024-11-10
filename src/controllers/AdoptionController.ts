import { prisma } from "@/lib/prisma"
import { Request, Response } from "express"

class AdoptionController {
  public async create(req: Request, res: Response) {
    const { petId, userId } = req.body
    try {
      const adoption = await prisma.adoption.create({
        data: {
          petId,
          userId,
          adoptionDate: new Date(),
        },
      })
      return res.status(201).json(adoption)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const adoptions = await prisma.adoption.findMany()
      return res.status(200).json(adoptions)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async getById(req: Request, res: Response) {
    const { adoptionId } = req.params
    try {
      const adoption = await prisma.adoption.findUnique({
        where: { id: adoptionId },
      })
      return res.status(200).json(adoption)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async delete(req: Request, res: Response) {
    const { adoptionId } = req.params
    try {
      const adoption = await prisma.adoption.delete({
        where: {
          id: adoptionId,
        },
      })
      return res.status(201).json(adoption)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}
export default AdoptionController
