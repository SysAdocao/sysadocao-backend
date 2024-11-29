import { Router } from "express"
import FavoriteController from "@/controllers/FavoriteController"

const router = Router()
const favoriteController = new FavoriteController()

router.post("/:userId/:petId", favoriteController.create)
router.delete("/:id", favoriteController.delete)
router.get("/:userId", favoriteController.getAll)
router.get("/:userId/:petId", favoriteController.getById)

export default router
