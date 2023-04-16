const orderModel = require('../model/order')
const HttpError = require('../helpers/http-error')
const  mongoose  = require('mongoose')
const userModel = require('../model/users')
require('dotenv').config()



//create a new order //
exports.CreateBook = async (request , response , next )=>{
 const {consumer , meal , time , adress} = request.body

 let user;
try{
    user = await userModel.findById(consumer)
    console.log(user)
}catch(err){
   return next(new HttpError(err))
}


let newBook;
 try{
    const sess = await new mongoose.startSession();
    await  sess.startTransaction();
     newBook = await orderModel({
      _id: new mongoose.Types.ObjectId(),
          meal, 
          time, 
          adress, 
          consumer,
    }, {new:true, runValidators:true})
   await user.save({session:sess})
   await newBook.save({session:sess})
   await sess.commitTransaction();
 }catch(err){
  return next(new HttpError(err, 500))
 }
 
 response.json({
   message:'Order send succesfully', 
   newBook, 
   bookCount
})
}




