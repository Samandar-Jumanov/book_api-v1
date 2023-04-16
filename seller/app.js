const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const ConnectDb = require('./helpers/db')
const sellerRouter = require('./seller_router')
const productRouter = require('./products/products_router')
//middleware 
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


//db connect
ConnectDb()

//routes 

app.use('/api/v1',sellerRouter)
app.use('/api/v1',productRouter)


app.listen(3002, ()=>{
    console.log('Server is runnig')
})