const playModel = require("../models/playModel");
const songModel = require("../models/songModel");
const { playlistModel, validate } = require("../models/playlistModel");
const bcrypt = require("bcrypt");

module.exports.search = async function search(req, res) {
  try {
    const search = req.query.search;
    if (search !== "") {
      const songs = await songModel
        .find({
          name: { $regex: search, $options: "i" },
        })
        .limit(10);
      const playlists = await playlistModel
        .find({
          name: { $regex: search, $options: "i" },
        })
        .limit(10);
      const result = { songs, playlists };
      res.status(200).json({
        data: result,
      });
    } else {
      res.status(200).json({
        message: "Nothing to show",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
