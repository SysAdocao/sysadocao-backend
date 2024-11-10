import { Router } from 'express';
import PetController from '@/controllers/PetController'; // 

const router = Router();
const petController = new PetController();

// Definindo as rotas
router.get('/pets', petController.fetchAllPets); // Ajeitei as rotas para baterem com o que foi definido no controller
router.get('/pets/:id', petController.fetchPetById);
router.post('/pets', petController.createNewPet);
router.put('/pets/:id', petController.updatePet);
router.delete('/pets/:id', petController.removePet);

export default router;