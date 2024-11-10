import { prisma } from "@/lib/prisma"
import { Request, Response } from "express"
import bcrypt from "bcryptjs"

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany()
      return res.status(200).json(users)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async getById(req: Request, res: Response) {
    const { userId } = req.params
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async create(req: Request, res: Response) {
    const { name, email, password, role, phone, addressId } = req.body
    const hashedPassword = await bcrypt.hashSync(password, 6)
    try {
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, role, phone, addressId },
      })
      return res.status(201).json(user)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    const { userId } = req.params
    const { name, email, phone, addressId } = req.body
    try {
      const user = await prisma.user.update({
        data: {
          name,
          email,
          phone,
          addressId,
        },
        where: { id: userId },
      })
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    const { userId } = req.params
    try {
      await prisma.user.delete({
        where: { id: userId },
      })
      return res.status(200).json({ message: "Cliente excluído com sucesso" })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}

export default UserController
