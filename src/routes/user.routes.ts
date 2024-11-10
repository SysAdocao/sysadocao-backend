import { Router } from "express"
import UserController from "@/controllers/UserController"

const router = Router()
const userController = new UserController()

router.post("/", userController.create)
router.get("/", userController.getAll)
router.get("/:userId", userController.getById)
router.put("/:userId", userController.update)
router.delete("/:userId", userController.delete)

export default router
