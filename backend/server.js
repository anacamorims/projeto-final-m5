import express from "express"
import swaggerUi from "swagger-ui-express"
import { createRequire } from "module"
import userRoutes from "./src/routes/user.routes.js"
import transactionRoutes from "./src/routes/transaction.routes.js"
import historyRoutes from "./src/routes/history.routes.js"
import cardRoutes from "./src/routes/card.routes.js"
import sequelize from "./src/database/db.js"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3000

const require = createRequire(import.meta.url)
const swaggerDocument = require("./src/docs/swagger.json")

app.use(cors())
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/users", userRoutes)
app.use("/transactions", transactionRoutes)
app.use("/history", historyRoutes)
app.use("/cards", cardRoutes)

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  try {
    await sequelize.authenticate()
    console.log("Conexão com o banco de dados estabelecida com sucesso.")
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error)
  }
})
