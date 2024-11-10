import { Router } from "express"
import petRouter from "./pet.routes"
import userRouter from "./user.routes"
import adoptionRouter from "./adoption.routes"
import LoginController from "@/controllers/LoginController"
import { verifyAuthentication } from "@/middlewares/auth"

const router = Router()
const loginController = new LoginController()

router.use("/users", userRouter)
router.use("/login", loginController.login)
router.use("/pets", verifyAuthentication, petRouter)
router.use("/adoptions", verifyAuthentication, adoptionRouter)

export default router
