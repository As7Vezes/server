import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { useRoutes } from './routes'
import bodyParser from 'body-parser'

const PORT = 8787

const app = express()
app.use(express.json())
app.use(bodyParser.json())
useRoutes(app)

app.listen(PORT, () => {
    console.log(`Servidor conectado na porta: ${PORT}`)
})