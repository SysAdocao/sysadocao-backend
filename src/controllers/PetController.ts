import { prisma } from "@/lib/prisma"
import { storage } from "@/config/firebase"
import multer from "multer"
import path from "path"
import { Request, Response, NextFunction } from "express"
import { PetSchema, SizeEnum } from "@/schemas/PetSchema"
import AppError from "@/errors/AppError"
import { Prisma } from "@prisma/client"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

class PetController {
  private upload = multer({ storage: multer.memoryStorage() })

  private async uploadImageToFirebase(file: Express.Multer.File) {
    const fileName = Date.now() + path.extname(file.originalname)
    const storageRef = ref(storage, `images/${fileName}`)
    const uploadTask = await uploadBytesResumable(storageRef, file.buffer)

    const url = await getDownloadURL(uploadTask.ref)
    return url
  }

  public create = (req: Request, res: Response, next: NextFunction) => {
    this.upload.single("image")(req, res, async (err) => {
      if (err) {
        return next(err)
      }

      try {
        const petData = PetSchema.omit({ id: true }).parse(req.body)
        const imageUrl = req.file
          ? await this.uploadImageToFirebase(req.file)
          : ""

        const newPet = await prisma.pet.create({
          data: {
            ...petData,
            imageUrl,
          },
        })
        return res.status(201).json(newPet)
      } catch (error) {
        next(error)
      }
    })
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, species, size, isVacinated, isCastrated } = req.query

      const filters: Prisma.PetWhereInput = {}

      if (name) {
        filters.name = { contains: name as string, mode: "insensitive" }
      }
      if (species) {
        filters.species = { contains: species as string, mode: "insensitive" }
      }
      if (size && SizeEnum.safeParse(size).success) {
        filters.size = size as Prisma.EnumSizeFilter
      }
      // verificar se o valor é true ou false para isVacinated e isCastrated
      if (isVacinated) {
        filters.isVacinated = isVacinated === "true"
      }
      if (isCastrated) {
        filters.isCastrated = isCastrated === "true"
      }

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
