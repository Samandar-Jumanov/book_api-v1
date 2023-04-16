const HttpError = require("../helpers/http-error")
const sellerModel = require("../seller_model")
const productModel = require('./products_model')
const mongoose = require('mongoose')

//get all products 

exports.getAllProducts = async (request , response , next)=>{
    const allProducts = await productModel.find({})
    try{
     const productsLength = allProducts.length
     if(productsLength !==0 ){
           response.json({
            allProducts, 
            productsLength
           })
     }else {
        response.json({
            message:'You have no products yet '
        })
     }


    }catch(err){
        return next( new HttpError('Internal server err '))
    }
}


//make new Product 

exports.createNewOrder = async (request, response, next) => {
  const { productName, price, seller, description } = request.body;

  let admin;
  let newProduct;

  try {
    admin = await sellerModel.findById(seller);
    if (!admin) {
      return next(new HttpError('Cannot find admin', 404));
    }
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  newProduct = await productModel({
    _id: new mongoose.Types.ObjectId(),
    productName,
    price,
    description,
  }, { new: true, runValidators: true });

  try {
    const sess = await mongoose.startSession();
    await sess.startTransaction();
    await admin.products.push(newProduct);
    await admin.save({ session: sess });
    await newProduct.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  response.json({
    message: 'Created successfully',
    newProduct,
  });
};


//update 
exports.updateProduct = async (request, response, next) => {
  const pid = request.params.pid;
  const { productName, price, seller, description, like , dislike  } = request.body;

  // Find the old admin and product
  const product = await productModel.findById(pid);
  const oldAdmin = await adminModel.findById(product.seller);

  // Check if the old admin exists
  if (!oldAdmin) {
    return next(new HttpError('Could not find admin user with the given ID', 404));
  }

  // Remove the product from the old admin's products array
  oldAdmin.products.pull(product);

  // Find the new admin
  const newAdmin = await adminModel.findById(seller);

  // Check if the new admin exists
  if (!newAdmin) {
    return next(new HttpError('Could not find admin user with the given ID', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    // Update the product with the new values
    const updatedProduct = await productModel.findByIdAndUpdate(
      pid,
      {
        productName,
        price,
        description,
        seller,
      },
      { new: true, runValidators: true }
    );

    // Add the product to the new admin's products array
    newAdmin.products.push(updatedProduct);

    // Save changes to the database
    await oldAdmin.save({ session: sess });
    await newAdmin.save({ session: sess });
    await updatedProduct.save({ session: sess });
    await sess.commitTransaction();

    response.json({
      message: 'Updated product successfully',
      updatedProduct,
    });
  } catch (err) {
    return next(new HttpError(err, 500));
  }
}

//delete product 
exports.deleteProduct = async (request, response, next) => {
  const Id = request.params.pid;
  const { seller } = request.body;
  const admin = await adminModel.findById(seller);

  if (!admin) {
    return next(new HttpError('Could not find admin user with the given ID', 404));
  }

  let product;
  try {
    product = await productModel.findById(Id);
  } catch (err) {
    return next(new HttpError('Something went wrong, could not delete product.', 500));
  }

  if (!product) {
    return next(new HttpError('Product not found.', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await productModel.findByIdAndDelete(Id, { session: sess });
    admin.products.pull(product);
    await admin.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  response.status(200).json({ message: 'Product deleted.' });
};



//like or dislike 

exports.reactionsLike = async (request , response , next)=>{
  const pid = request.params.pid 
 let product;
 try{
     product = await productModel.findById(pid)
     if(!product){
        return next (new HttpError('Cannot find product', 404))
     }
       await  product.like++
       await product.save()
      response.json(product.like)
 }catch(err){
    return next( new HttpError(err, 500))
 }
}

//dislike 

exports.reactionsDislike = async (request, response, next) => {
  const pid = request.params.pid;
  try {
    const product = await productModel.findById(pid);
    if (!product) {
      return next(new HttpError('Cannot find product', 404));
    }
    product.dislike--;
    await product.save();
    response.json(product.dislike);
  } catch (err) {
    return next(new HttpError(err, 500));
  }
};

//save product
exports.saveProducts = async (request , response , next)=>{
    const pid = request.params.pid;
  const {productName, price ,seller , description, like , dislike } = request.body 

  let admin;

  try{
    admin = await adminModel.findById(seller)
  }catch(err){
      return next ( new HttpError(err, 404))
  }

  let product;
  try{
    product = await productModel.findById(pid)
  }catch(err){

  }

  try{
   const sess = await mongoose.startSession();
   await sess.startTransaction();
   await  admin.saved.push(product)
   await sess.commitTransaction();
  }catch(err){
    return next( new HttpError(err, 500))
  }

  response.json({
    message:'Added to the saved succefully',
    product
  })
}










