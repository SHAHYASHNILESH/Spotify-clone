const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secrets');

module.exports=(req,res,next)=>{
    const token=req.header("x-auth-token");
    if(!token){
        res.json({
            message:'Access denied, no token provided'
        });
    }
    jwt.verify(token,JWT_KEY,(error,validToken)=>{
        if(error){
            res.json({
                message:'Invalid token'
            });
        }
        else{
            req.user=validToken;
            next();

        }
    })

}