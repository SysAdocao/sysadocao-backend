import { Router } from "express"
import PetController from "@/controllers/PetController" //

const router = Router()
const petController = new PetController()

router.post("/", petController.create)
router.get("/", petController.getAll)
router.get("/:id", petController.getById)
router.put("/:id", petController.update)
router.delete("/:id", petController.delete)

export default router
