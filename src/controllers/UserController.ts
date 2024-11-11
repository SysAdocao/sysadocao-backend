import { prisma } from "@/lib/prisma"
import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import AppError from "@/errors/AppError"
import { UserSchema } from "@/schemas/UserSchema"
import { AddressSchema } from "@/schemas/AddressSchema"

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = UserSchema.omit({ id: true, addressId: true }).parse(
        req.body,
      )

      const addressData = AddressSchema.omit({ id: true }).parse(
        req.body.address,
      )

      const hashedPassword = bcrypt.hashSync(userData.password, 6)

      const userWithSameEmail = await prisma.user.findUnique({
        where: { email: userData.email },
      })
      if (userWithSameEmail) {
        throw new AppError("Email already in use!", 400)
      }

      const user = await prisma.$transaction(async (prisma) => {
        const createdAddress = await prisma.address.create({
          data: addressData,
        })

        const createdUser = await prisma.user.create({
          data: {
            ...userData,
            password: hashedPassword,
            addressId: createdAddress.id,
          },
        })

        return createdUser
      })

      return res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany()
      return res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        throw new AppError("User not found!", 404)
      }

      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const userData = UserSchema.partial()
        .omit({ id: true, addressId: true })
        .parse(req.body)

      const user = await prisma.user.update({
        data: userData,
        where: { id },
      })

      if (!user) {
        throw new AppError("User not found!", 404)
      }

      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      await prisma.user.delete({
        where: { id },
      })
      return res.status(200).json({ message: "User deleted successfully!" })
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
