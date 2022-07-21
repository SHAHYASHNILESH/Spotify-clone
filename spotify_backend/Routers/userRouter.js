const express=require('express');
const userRouter=express.Router();
const {playModel,validate}=require('../models/playModel');
const bcrypt=require('bcrypt');
const {createUser,loginUser,getAllUser,getUser,updateUser,deleteUser}=require('../Controller/userController');
const auth=require('../middlewares/authMiddleware');
const admin=require('../middlewares/admin');
const validateObjectId=require('../middlewares/validateObjectId');

userRouter
.route('/')
.post(createUser)

userRouter
.route('/login')
.post(loginUser)

// userRouter.use(admin);
userRouter
.route('/')
.get(getAllUser)

// userRouter.use(validateObjectId);
// userRouter.use(auth);
userRouter
.route('/:id')
.get(getUser)
.patch(updateUser)

// userRouter.use(validateObjectId);
// userRouter.use(admin);
userRouter
.route('/:id').delete(deleteUser)


module.exports=userRouter