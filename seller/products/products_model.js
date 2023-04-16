const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    productName:{type:String , required:true}, 
    price:{type:String, required:true}, 
    seller:{type:mongoose.Types.ObjectId, ref :'admin', },  
    description:{type:String, required:true},
    like:{type:Number, default:0 }, 
    dislike:{type:Number,  default:0 }
})


const productModel = new mongoose.model('products', productsSchema)
module.exports = productModel;