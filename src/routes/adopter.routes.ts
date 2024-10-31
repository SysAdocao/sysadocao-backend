import { Router } from "express"
import { AdopterController } from "../controllers/AdopterController" // Falta implementar o controller

const router = Router()
const adopterController = new AdopterController()

router.post("/", adopterController.create)
router.get("/", adopterController.getAll)
router.get("/:adopterId", adopterController.getById)
router.put("/", adopterController.update)
router.delete("/", adopterController.delete)

export default router
