const adminModel = require('./seller_model')
const HttpError = require('./helpers/http-error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.signup = async (request, response, next) => {
  const { username, password } = request.body 

  try {
    const admin = await adminModel.findOne({ username })

    if (!admin) {
      const hashedPassword = await bcrypt.hash(password, 12)
      const newAdmin = await adminModel({
        username, 
        password: hashedPassword
      })

      await newAdmin.save()
      jwt.sign({ id: newAdmin.id }, process.env.token_key, (err, token) => {
        if (err) {
          return next(new HttpError(err.message, 500))
        }
        
        return response.json({
          message: 'Admin created successfully', 
          token,
          newAdmin
        })
      })
    } else {
        return next(new HttpError('Username already exists', 400))
    }
  } catch (err) {
    return next(new HttpError(err.message, 500))
  }
}


//sign in 

exports.login = async (request , response , next)=>{
    const {username , password } = request.body
    const admin = await adminModel.findOne({username})

    if(!admin){
     return next( new HttpError('You have no account yet ', 404))
    }

    const validPassword = await bcrypt.compare(password , admin.password);
    const validUsername = await bcrypt.compare(username, admin.username)
    if(!validPassword && !validUsername){
        return next(new HttpError('Password or username is not valid', 404))
    }

try{
const token = await jwt.sign({id: admin.id }, process.env.token_key)
 response.json({
    message:'Logged in ', 
    token
 })

}catch(err){
  return next( new HttpError('Cannot logged in', 500))
}
}