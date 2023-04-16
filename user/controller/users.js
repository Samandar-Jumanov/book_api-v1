const UserModel = require('../model/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const HttpError = require('../helpers/http-error')
const userModel = require('../model/users')


require('dotenv').config()
exports.signup = async (request , response , next)=>{
const {username, email,password } = request.body
const user = await UserModel.findOne( {email })


if(user){
    return next(new HttpError('You have an account already', 412))
}


try{
    const hashedPassword = await bcrypt.hash(password , 12)
    const newUser = await UserModel({
        username, 
        email, 
        password:hashedPassword, 
    })


await newUser.save()
 const token = await jwt.sign({userId:newUser.id}, process.env.token_key)
 response.json({
    token , 
    newUser, 
    message:'Created succesfully'
 })
}catch(err){
   return next(new HttpError('You have an account already'))
} 
}



exports.login = async (request , response , next)=>{
    const {email , password } = request.body
    const user = await userModel.findOne({email})

    if(!user){
     return next( new HttpError('You have no account yet ', 404))
    }

    const validPassword = await bcrypt.compare(password , user.password);
    const validEmail = await bcrypt.compare(email, user.email)
    if(!validPassword && !validEmail){
        return next(new HttpError('Password or username is not valid', 404))
    }

try{
const token = await jwt.sign({id: user._id }, process.env.token_key)
 response.json({
    message:'Logged in ', 
    token
 })

}catch(err){
  return next( new HttpError('Cannot logged in', 500))
}
}

