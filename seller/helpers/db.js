const mongoose  = require('mongoose')


//dotenv 
require('dotenv').config()

function ConnectDb (){
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log('Connect to db'))
    .catch(err=>console.log(err))
}

module.exports = ConnectDb