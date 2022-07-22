const express=require('express');
const playModel=require('../models/playModel');
const songModel=require('../models/songModel');
const playlistModel=require('../models/playlistModel');
const bcrypt=require('bcrypt');
const auth=require('../middlewares/authMiddleware');
const admin=require('../middlewares/admin');
const validateObjectId=require('../middlewares/validateObjectId');
const Joi=require('joi');
const {createPlaylist,getAllPlaylist,editPlaylist,addSong, removeSong, favPlaylist,randomPlaylist,getPlaylistById,deletePlaylist}=require('../Controller/playlistController');


const playlistRouter=express.Router();

playlistRouter
.route('/')
.get(auth,getAllPlaylist)
.post(createPlaylist)

playlistRouter
.route('/edit/:id')
.post(validateObjectId,auth,editPlaylist)

playlistRouter
.route('/add')
.post(auth,addSong)

playlistRouter
.route('/remove')
.post(removeSong)

playlistRouter
.route('/fav')
.get(auth,favPlaylist)

playlistRouter
.route('/random')
.get(randomPlaylist)

playlistRouter
.route('/:id')
.get(getPlaylistById)
.delete(validateObjectId,auth,deletePlaylist)

module.exports=playlistRouter;

