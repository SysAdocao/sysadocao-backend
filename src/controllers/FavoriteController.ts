import { prisma } from "@/lib/prisma"
import { Request, Response, NextFunction } from "express"
import AppError from "@/errors/AppError"

class FavoriteController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, petId } = req.params

      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      })

      if (!userExists) {
        throw new AppError("Usuário não encontrado", 404)
      }

      const petExists = await prisma.pet.findUnique({
        where: { id: petId },
      })

      if (!petExists) {
        throw new AppError("Pet não encontrado", 404)
      }

      const existingFavorite = await prisma.favorite.findFirst({
        where: {
          userId,
          petId,
        },
      })

      if (existingFavorite) {
        throw new AppError("Pet já está nos favoritos do usuário", 400)
      }

      const favorite = await prisma.favorite.create({
        data: {
          userId,
          petId,
        },
      })

      return res.status(201).json(favorite)
    } catch (error) {
      next(error)
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const favorite = await prisma.favorite.findUnique({ where: { id } })

      if (!favorite) {
        throw new AppError("Favorito não encontrado", 404)
      }

      await prisma.favorite.delete({
        where: { id },
      })

      return res.status(200).json({ message: "Favorito removido com sucesso!" })
    } catch (error) {
      next(error)
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params

    try {
      const favorites = await prisma.favorite.findMany({
        where: { userId },
        include: {
          pet: true,
        },
      })

      if (favorites.length === 0) {
        throw new AppError("Nenhum favorito encontrado para o usuário", 404)
      }

      return res.status(200).json(favorites)
    } catch (error) {
      next(error)
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    const { userId, petId } = req.params

    try {
      const favorite = await prisma.favorite.findFirst({
        where: {
          userId,
          petId,
        },
        include: {
          pet: true,
        },
      })

      if (!favorite) {
        return res.status(404).json({ message: "Favorito não encontrado" })
      }

      return res.status(200).json(favorite)
    } catch (error) {
      next(error)
    }
  }
}

export default FavoriteController
