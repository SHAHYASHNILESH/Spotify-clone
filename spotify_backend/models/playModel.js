const mongoose=require('mongoose');
const Joi=require('joi');
const jwt=require('jsonwebtoken');
const passwordComplexity=require('joi-password-complexity');
const JWT_KEY=require('../secrets');

const db_link='mongodb+srv://admin:RSZHek7KCmdYYSPn@cluster0.ptf4r.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log('db connected successfully');
})
.catch(function(err){
    console.log(err);
})

const playSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    month:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    likedSongs:{
        type:[String],
        default:[]
    },
    playlists:{
        type:[String],
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

playSchema.methods.generateAuthToken=function(){
    let uid=this._id;
    console.log(uid);
    let tokens=jwt.sign({payload:uid},JWT_KEY);
    return tokens;
}

const validate = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(10).required(),
		email: Joi.string().email().required(),
		password: passwordComplexity().required(),
		month: Joi.string().required(),
		date: Joi.string().required(),
		year: Joi.string().required(),
		gender: Joi.string().valid("male", "female", "non-binary").required(),
	});
	return schema.validate(user);
};

const playModel=mongoose.model('playModel',playSchema);
module.exports={playModel,validate};

