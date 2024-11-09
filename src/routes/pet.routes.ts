import { Router } from "express"
import  PetController  from "../controllers/PetController" // Falta implementar o controller

const router = Router()
const petController = new PetController()

router.post("/", petController.create)
router.get("/", petController.getAll)
router.get("/:petId/", petController.getById)
router.delete("/", petController.delete)

export default router
