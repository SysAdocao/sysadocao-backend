import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export class AdopterController {

    async getAdopters (request, response) {
        try {
            const adopters = await prismaClient.adopter.findMany();
            return response.status(200).json(adopters);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async getAdotanteById (request, response) {
        const { id } = request.params;
        try {
            const adopter = await prismaClient.adopter.findUnique({
                where: { id }
            })
            return response.status(200).json(adopter);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async postAdotante (request, response) {
        const { name, email, phone, adressId } = request.body;
        try {
            const adopter = await prismaClient.adopter.create({
                data: {name, email, phone, adressId}
            })
            return response.status(201).json(adopter);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async putAdotante (request, response) {
        const { id } = request.params;
        const { name, email, phone, adressId } = request.body;
        try {
            const adopter = await prismaClient.adopter.update({
                data: {
                    name, email, phone, adressId
                },
                where: { id }
            })
            return response.status(200).json(adopter);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async deleteAdotante (request, response) {
        const { id } = request.params;
        try {
            await prismaClient.adopter.delete({
                where: { id }
            })
            return response.status(200).json({ message: 'Cliente excluído com sucesso' });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}
