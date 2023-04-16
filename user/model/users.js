const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    username:{type:String, required:true }, 
    email:{type:String , required:true , 
     validate:
     [ validator.isEmail, 'Enter valid email'], 
     unique:true
    }, 
    password:{type:String , required:true}, 
    books:{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orders' }], default: [] }
})


const userModel = new mongoose.model('users', userSchema)
module.exports = userModel