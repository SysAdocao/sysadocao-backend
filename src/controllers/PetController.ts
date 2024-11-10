import  prisma  from '../database/PrismaCliente'; 
import { Request, Response } from 'express'; 

class PetController {
    public async fetchAllPets(req: Request, res: Response): Promise<void> {
        try {
            const petsList = await prisma.pet.findMany();
            res.status(200).json(petsList);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar pets: ' + (err as Error).message });
        }
    }

    public async fetchPetById(req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        try {
            const petData = await prisma.pet.findUnique({ where: { id } });
            if (!petData) {
                res.status(404).json({ error: 'Pet não encontrado' });
            }
            res.status(200).json(petData);
        } catch (err: any) { 
            res.status(500).json({ error: 'Erro ao buscar pet: ' + err.message });
        }
    }

    public async createNewPet(req: Request, res: Response): Promise<void> { 
        const { nome, especie, dataNascimento, descricao, status } = req.body;
        try {
            const newPet = await prisma.pet.create({
                data: {
                    nome,
                    especie,
                    dataNascimento: new Date(dataNascimento),
                    descricao,
                    status,
                },
            });
            res.status(201).json(newPet);
        } catch (err: any) {
            res.status(500).json({ error: 'Erro ao criar pet: ' + err.message });
        }
    }

    public async updatePet(req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        const { nome, especie, dataNascimento, descricao, status } = req.body;
        try {
            const updatedPet = await prisma.pet.update({
                where: { id },
                data: {
                    nome,
                    especie,
                    dataNascimento: new Date(dataNascimento),
                    descricao,
                    status,
                },
            });
            res.status(200).json(updatedPet);
        } catch (err: any) { 
            res.status(500).json({ error: 'Erro ao atualizar pet: ' + err.message });
        }
    }

    public async removePet(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.pet.delete({ where: { id } });
            res.status(200).json({ message: 'Pet excluído com sucesso' });
        } catch (err: any) {
            res.status(500).json({ error: 'Erro ao excluir pet: ' + err.message });
        }
    }
}

export default PetController; 