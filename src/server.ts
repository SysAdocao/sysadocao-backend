import express, { json } from "express"
import cors from "cors"
import router from "@/routes/router"
import "express-async-errors"
import { errorHandling } from "./middlewares/errorHandling"

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors())
app.use(json())
app.use(router)
app.use(errorHandling)

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
