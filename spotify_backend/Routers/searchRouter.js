const express=require('express');
const playModel=require('../models/playModel');
const songModel=require('../models/songModel');
const playlistModel=require('../models/playlistModel');
const bcrypt=require('bcrypt');
const auth=require('../middlewares/authMiddleware');
const admin=require('../middlewares/admin');
const validateObjectId=require('../middlewares/validateObjectId');
const Joi=require('joi');

const searchRouter=express.Router();
searchRouter
.route('/')
.get(auth,search)


module.exports=searchRouter;