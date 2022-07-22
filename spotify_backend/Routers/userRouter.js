const express=require('express');
const {playModel,validate}=require('../models/playModel');
const bcrypt=require('bcrypt');
const {createUser,loginUser,getAllUser,getUser,updateUser,deleteUser}=require('../Controller/userController');
const auth=require('../middlewares/authMiddleware');
const admin=require('../middlewares/admin');
const validateObjectId=require('../middlewares/validateObjectId');

const userRouter=express.Router();

userRouter
.route('/')
.post(createUser)

userRouter
.route('/login')
.post(loginUser)


userRouter
.route('/')
.get(getAllUser)


userRouter
.route('/:id')
.get(validateObjectId,auth,getUser)
.patch(validateObjectId,auth,updateUser)


userRouter
.route('/:id')
.delete(validateObjectId,deleteUser)


module.exports=userRouter;