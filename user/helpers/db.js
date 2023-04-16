const mongoose = require('mongoose')

require('dotenv').config()

//db  Connection
function ConnectDb(){
 mongoose
.connect(process.env.DB_URL)
.then(()=>console.log('Connected to db'))
.catch(err=>console.log(err))
}

module.exports = ConnectDb


