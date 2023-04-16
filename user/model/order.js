const mongoose = require('mongoose')


const orderSchema  = new mongoose.Schema({
    meal:{type:String, required:true,}, 
    address:{type:String ,  required:true}, 
    consumer:{type:mongoose.Types.ObjectId, ref:'users' ,required:true},
   
})

const orderModel = new mongoose.model('orders', orderSchema)
module.exports = orderModel