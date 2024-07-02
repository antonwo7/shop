require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')
const authRouter = require('./routers/authRouter')
const productRouter = require('./routers/productRouter')
const optionRouter = require('./routers/optionRouter')
const assetRouter = require('./routers/assetRouter')
const dbService = require("./services/BDService");

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/options', optionRouter)
app.use('/assets', assetRouter)
app.use(errorMiddleware)

async function start() {
    try {
        await dbService.Init(process.env.MONGO_URI)

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch(e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}


start()