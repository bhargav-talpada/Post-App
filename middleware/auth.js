const userSchema=require('../schema/user')

const jwt=require('jsonwebtoken')


exports.Protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
        console.log(token);
        if(!token){
            return res.status(401).json({message:'Not authorized please provide token'})
        }
        try {
            const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY)
            console.log(decoded);
            req.user=await userSchema.findById(decoded.id)
            console.log(req.user);
            if(!req.user){
                return res.status(401).json({message:'User Not Found'})
            }
            // next()
        } catch (error) {
            return res.status(401).json({message:'Not authorized for this route'})
        }
    }
    else{
        return res.status(401).json({message:'Authorization token required'})
    }
}