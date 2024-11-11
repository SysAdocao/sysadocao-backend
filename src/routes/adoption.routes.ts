import { Router } from "express"
import AdoptionController from "@/controllers/AdoptionController" // Falta implementar o controller

const router = Router()
const adoptionController = new AdoptionController()

router.post("/", adoptionController.create)
router.get("/", adoptionController.getAll)
router.get("/:id", adoptionController.getById)
router.delete("/:id", adoptionController.delete)

export default router
