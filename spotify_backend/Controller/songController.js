const playModel = require("../models/playModel");
const { songModel, validate } = require("../models/songModel");
const bcrypt = require("bcrypt");

module.exports.createSong = async function createSong(req, res) {
  try {
    let data = req.body;
    const { error } = validate(data);
    if (error) {
      res.json({
        message: "Error occured",
      });
    } else {
      let song = await songModel.create(data);
      if (song) {
        res.json({
          message: "Song created successfully",
          songData: song,
        });
      } else {
        res.json({
          message: "No song created",
        });
      }
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAllSongs = async function getAllSongs(req, res) {
  try {
    let songs = await songModel.find();
    if (songs) {
      res.json({
        message: "All Songs retrieved successfully",
        data: songs,
      });
    } else {
      res.json({
        message: "No songs found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updateSong = async function updateSong(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    // console.log(id);
    // console.log(dataToBeUpdated);
    let song = await songModel.findById(id);
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    for (let i = 0; i < keys.length; i++) {
      song[keys[i]] = dataToBeUpdated[keys[i]];
    }
    const updatedData = await song.save();
    //console.log(plan);
    res.json({
      message: "Data updated successfully",
      data: song
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.deleteSong = async function deleteSong(req, res) {
  try {
    let id = req.params.id;
    let deletedSong = await songModel.findByIdAndDelete(id);
    if (deletedSong) {
      res.json({
        message: "Song deleted successfully",
        data: deletedSong
      });
    } else {
      res.json({
        message: "Song not Found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

module.exports.likeSong=async function likeSong(req,res){
    try{
        let id=req.params.id;
        console.log(id);
        let song=await songModel.findById(id);
        //console.log(req.user._id);
        if(!song){
            res.json({
                message:'No song found'
            });
        }
        else{
            // let id=req.user._id;
            // console.log(id);
            let user=await playModel.findById(req.user._id);
            console.log(user);
            const index=user.likedSongs.indexOf(song._id);
            if(index===-1){
                user.likedSongs.push(song._id);
                res.json({
                    message:'Added to your list of liked songs'
                });
            }
            else{
                user.likedSongs.splice(index,1);
                res.json({
                    message:"Removed from your list of liked songs"
                });
            }
            await user.save()
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.getAllLikedSongs=async function getAllLikedSongs(req,res){
    try{
        let user=await playModel.findById(req.user._id);
        let songs=await songModel.find({_id:user.likedSongs});
        if(songs){
            res.json({
                message:'Retrieved all liked songs',
                data:songs
            });
        }
        else{
            res.json({
                message:'No Liked songs found'
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
