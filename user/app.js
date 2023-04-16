const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const ConnectDb = require('./helpers/db')
const bookRouter = require('./route/orders')
const userRouter = require('./route/users')
//Middleware setup

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//db connecion 
ConnectDb()



//routes 
//users 
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/users', userRouter)




app.listen(process.env.PORT, ()=>{
    console.log('Server is working ')
})