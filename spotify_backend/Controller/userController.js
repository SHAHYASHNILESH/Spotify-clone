const {playModel,validate}=require('../models/playModel');
const bcrypt=require('bcrypt');

module.exports.createUser=async function createUser(req,res){
    try{
        let data=req.body;
        let isExist=await playModel.findOne({email:data.email});
        if(isExist){
            res.json({
                message:'User with the given email already exists'
            });
        }
        else{
            let salt=await bcrypt.genSalt();
            let hashedString=await bcrypt.hash(data.password,salt);
            data.password=hashedString;
            let user=await playModel.create(data);
            if(user){
                res.json({
                    message:'User created successfully',
                    ussrDetails:user
                });
            }
            else{
                res.json({
                    message:'No user created'
                });
            }
        }

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}


module.exports.loginUser=async function loginUser(req,res){
    try{
        let data=req.body;
        let user=await playModel.findOne({email:data.email});
        if(!user){
              res.json({
                message:'No user found with the given email id'
              });
        }
        else{
            const isvalidPassword=await bcrypt.compare(data.password,user.password);
            if(!isvalidPassword){
               res.json({
                message:'Invalid email or password'
               }); 
            }
            else{
                const token=user.generateAuthToken();
                res.cookie('login',token,{httpOnly:true});
                res.json({
                    message:'User logged in successfully',
                    data:token
                });
            }
        }

    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports.getAllUser=async function getAllUser(req,res){
    try{
        let users=await playModel.find();
        if(users){
            res.json({
                message:'All users retrieved successfully',
                data:users
            });
        }
        else{
            res.json({
                message:'No users found'    
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.getUser=async function getUser(req,res){
    try{
        let id=req.params.id;
        let user=await playModel.findById(id);
        if(user){
            res.json({
                message:'User found',
                data:user
            });
        }
        else{
            res.json({
                message:'No user found'
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.updateUser=async function updateUser(req,res){
    try{
        let id=req.params.id;
        let dataToBeUpdated=req.body;
        // console.log(id);
        // console.log(dataToBeUpdated);
        let user=await playModel.findById(id);
        let keys=[];
        for (let key in dataToBeUpdated){
            keys.push(key);
        }
        for(let i=0;i<keys.length;i++){
            user[keys[i]]=dataToBeUpdated[keys[i]];
        }
        const updatedData=await user.save();
        //console.log(plan);
        res.json({
            message:"Data updated successfully",
            data:user
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.deleteUser=async function deleteUser(req,res){
    try{
        let id=req.params.id;
        let deletedUser=await playModel.findByIdAndDelete(id);
        if(deletedUser){
            res.json({
                message:'User deleted successfully',
                data:deletedUser
            });
        }
        else{
            res.json({
                message:'User not Found',    
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }

}

