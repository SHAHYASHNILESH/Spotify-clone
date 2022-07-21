const mongoose=require('mongoose');
const Joi=require('joi');
const jwt=require('jsonwebtoken');
const passwordComplexity=require('joi-password-complexity');
const JWT_KEY=require('../secrets');

const db_link='mongodb+srv://admin:RSZHek7KCmdYYSPn@cluster0.ptf4r.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    //console.log('db connected successfully');
})
.catch(function(err){
    console.log(err);
})

const ObjectId=mongoose.Schema.Types.ObjectId;

const playlistSchema=mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   user:{
    type:ObjectId,
    ref:'user',
    required:true
   },
   desc:{
    type:String
   },
   songs:{
    type:Array,
    default:[]
   },
   img:{
    type:String
   }

});

const validate = (playList) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		user: Joi.string().required(),
		desc: Joi.string().allow(""),
		songs: Joi.array().items(Joi.string()),
		img: Joi.string().allow(""),
	});
	return schema.validate(playList);
};

const playlistModel=mongoose.model('playlistModel',playlistSchema);
module.exports={playlistModel,validate};


