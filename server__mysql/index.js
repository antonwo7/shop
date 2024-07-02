require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')
const authRouter = require('./routers/authRouter')
const productRouter = require('./routers/productRouter')
const optionRouter = require('./routers/optionRouter')
const netRouter = require('./routers/netRouter')
const assetRouter = require('./routers/assetRouter')

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
app.use('/nets', netRouter)
app.use('/assets', assetRouter)
app.use(errorMiddleware)

const start = async () => {
    try {
        app.listen(PORT, () => console.log('server started on PORT: ' + PORT))

    } catch (e) {
        console.log(e)
    }
}

start()