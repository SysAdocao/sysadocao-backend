import { Router } from "express"
import AdoptionController from "@/controllers/AdoptionController" // Falta implementar o controller

const router = Router()
const adoptionController = new AdoptionController()

router.post("/", adoptionController.create)
router.get("/", adoptionController.getAll)
router.get("/:adoptionId", adoptionController.getById)
router.delete("/:adoptionId", adoptionController.delete)

export default router
