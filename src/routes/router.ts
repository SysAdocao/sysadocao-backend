import { Router } from "express"
import petRouter from "./pet.routes"
import adopterRouter from "./adopter.routes"
import adoptionRouter from "./adoption.routes"

const router = Router()

router.use("/pets", petRouter)
router.use("/adopters", adopterRouter)
router.use("/adoptions", adoptionRouter)

export default router
