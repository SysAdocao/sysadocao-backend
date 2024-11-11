import { Router } from "express"
import UserController from "@/controllers/UserController"

const router = Router()
const userController = new UserController()

router.post("/", userController.create)
router.get("/", userController.getAll)
router.get("/:id", userController.getById)
router.put("/:id", userController.update)
router.delete("/:id", userController.delete)

export default router
