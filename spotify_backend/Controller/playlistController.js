const playModel = require("../models/playModel");
const songModel = require("../models/songModel");
const { playlistModel, validate } = require("../models/playlistModel");
const bcrypt = require("bcrypt");

module.exports.createPlaylist = async function createPlaylist(req, res) {
  try {
    let data = req.body;
    const { error } = validate(data);
    if (error) {
      res.json({
        message: "Error occured",
      });
    } else {
      const user = await playModel.findById(req.user._id);
      const playlist = await playlistModel({ ...data, user: user._id });
      user.playlist.push(playlist._id);
      await user.save();
      res.json({
        message: "Playlist created successfully",
        data: playlist,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.editPlaylist = async function editPlaylist(req, res) {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      desc: Joi.string().allow(""),
      img: Joi.string().allow(""),
    });
    let data = req.body;
    const { error } = schema.validate(data);
    if (error) {
      res.json({
        message: "Error occured",
      });
    } else {
      const playlist = await playlistModel.findById(req.params.id);
      if (playlist) {
        const user = await playModel.findById(req.user._id);
        if (!user._id.equals(playlist.user)) {
          res.json({
            message: "User dont have access to edit",
          });
        } else {
          playlist.name = data.name;
          playlist.desc = data.desc;
          playlist.img = data.img;
          await playlist.save();
          res.json({
            message: "Playlist edited successfully",
            editDetails: playlist,
          });
        }
      } else {
        res.json({
          message: "No Playlist found",
        });
      }
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.addSong = async function addSong(req, res) {
  try {
    const schema = Joi.object({
      playlistId: Joi.string().required(),
      songId: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.json({
        message: "Error found",
      });
    } else {
      const user = await playModel.findById(req.user._id);
      const playlist = await playlistModel.findById(req.body.playlistId);
      if (playlist) {
        if (!user._id.equals(playlist.user)) {
          res.json({
            message: "User dont have access to add",
          });
        }
        if (playlist.songs.indexOf(req.body.songId) === -1) {
          playlist.songs.push(req.body.songId);
        }
        await playlist.save();
        res.json({
          message: "Song added to playlist successfully",
          data: playlist,
        });
      }
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.removeSong = async function removeSong(req, res) {
  try {
    const schema = Joi.object({
      playlistId: Joi.string().required(),
      songId: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.json({
        message: "Error found",
      });
    } else {
      const user = await playModel.findById(req.user._id);
      const playlist = await playlistModel.findById(req.body.playlistId);
      if (playlist) {
        if (!user._id.equals(playlist.user)) {
          res.json({
            message: "User dont have access to add",
          });
        } else {
          const index = playlist.songs.indexOf(req.body.songId);
          playlist.songs.splice(index, 1);
          await playlist.save();
          res.json({
            message: "Song removed from the playlist successfully",
            data: playlist,
          });
        }
      }
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.favPlaylist = async function favPlaylist(req, res) {
  try {
    const user = await playModel.findById(req.user._id);
    const playlist = await playlistModel.find({ _id: user.playlist });
    if (playlist) {
      res.json({
        message: "Favourite Playlist retrieved successfully",
        data: playlist,
      });
    } else {
      res.json({
        message: "No Playlist Found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.randomPlaylist = async function randomPlaylist(req, res) {
  try {
    const playlists = await playlistModel.aggregate([
      { $sample: { size: 10 } },
    ]);
    if (playlists) {
      res.json({
        message: "List of random playlists",
        data: playlists,
      });
    } else {
      res.json({
        message: "No Playlists found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAllPlaylist = async function getAllPlaylist(req, res) {
  try {
    let playlists = await playlistModel.find();
    if (playlists) {
      res.json({
        message: "All Playlists retrieved successfully",
        data: playlists,
      });
    } else {
      res.json({
        message: "No Playlists found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getPlaylistById = async function getPlaylistById(req, res) {
  try {
    let playList = await playlistModel.findById(req.params.id);
    if (playList) {
      let songs = await songModel.find({ _id: playList.songs });
      if (songs) {
        res.json({
          message: "All Songs retrieved successfully from the given playlist",
          data: { playList, songs },
        });
      } else {
        res.json({
          message: "No songs found in the given playlist",
        });
      }
    } else {
      res.json({
        message: "No Playlist found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deletePlaylist = async function deletePlaylist(req, res) {
  try {
    const user = await playModel.findById(req.user._id);
    const playlist = await playlistModel.findById(req.params.id);
    if (!user._id.equals(playlist.user))
      return res
        .status(403)
        .json({ message: "User don't have access to delete!" });

    const index = user.playlists.indexOf(req.params.id);
    user.playlists.splice(index, 1);
    await user.save();
    await playlist.remove();
    res.json({
        message:'Playlist deleted successfully',
        data:playlist
    })
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
