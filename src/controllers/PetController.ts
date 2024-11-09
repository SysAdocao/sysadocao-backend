import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";

class PetController {
    public async create(req: Request, res: Response): Promise<void>{
        const {petId, adopterId} = req.params;
        const adoption = await prisma.adoption.create({
            data: {
                petId, 
                adopterId,
                adoptionDate: new Date()
            }
        })
        res.status(201).json(adoption)
    }
    public async getAll(req: Request, res: Response): Promise<void>{
        const adoptions = await prisma.adoption.findMany()
        res.status(201).json(adoptions)
    }
    public async getById(req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        const adoption = await prisma.adoption.findUnique({
            where: {
                id
            }
        })
        res.status(201).json(adoption)
    }
    public async delete(req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        const adoption = await prisma.adoption.delete({
            where: {
                id
            }
        })
        res.status(201).json(adoption)
    }
}
export default PetController;