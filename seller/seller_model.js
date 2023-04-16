const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    username:{type:String ,required:true},
    password:{type:String, required:true}, 
    products:{type:[{type:mongoose.Types.ObjectId, ref:'products', defult:[]}]}, 
    saved:{type:[{type:mongoose.Types.ObjectId, ref:'products', default:[]}]}
});

const sellerModel = new mongoose.model('admin', sellerSchema)

module.exports = sellerModel