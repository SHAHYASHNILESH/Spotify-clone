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

const songSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    song:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    }
});

const validate = (song) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		artist: Joi.string().required(),
		song: Joi.string().required(),
		img: Joi.string().required(),
		duration: Joi.number().required(),
	});
	return schema.validate(song);
};

const songModel=mongoose.model('songModel',songSchema);
module.exports={songModel,validate};