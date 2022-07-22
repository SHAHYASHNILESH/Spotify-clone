const express=require('express');
const playModel=require('../models/playModel');
const {songModel,validate}=require('../models/songModel');
const bcrypt=require('bcrypt');
const auth=require('../middlewares/authMiddleware');
const admin=require('../middlewares/admin');
const validateObjectId=require('../middlewares/validateObjectId');
const {createSong,getAllSongs,updateSong,deleteSong,likeSong,getAllLikedSongs}=require('../Controller/songController');

const songRouter=express.Router();

songRouter
.route('/')
.get(getAllSongs)
.post(admin,createSong)

songRouter
.route('/:id')
.patch(validateObjectId,updateSong)
.delete(validateObjectId,deleteSong)


songRouter
.route('/like/:id')
.put(validateObjectId,auth,likeSong)


songRouter
.route('/like')
.get(auth,getAllLikedSongs)

module.exports=songRouter;