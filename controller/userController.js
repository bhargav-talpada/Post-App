const userSchema = require('../schema/user')
const ErrorResponse = require('../middleware/ErrorResponse')
exports.createUser = async(req,res, next)=>{
    
        let payload={
            UserName:req.body.UserName,
            Password:req.body.Password
        }
        const user = await userSchema.create(payload);
        res.status(201)
        .send({success:true, message:"Successfully created", payload: user});
    
};

exports.login = async(req,res,next)=>{
    try {
        const {UserName,Password} = await req.body;
        if(!UserName||!Password){
            return next(new ErrorResponse('Username or Password is missing',401))
        }
        let user = await userSchema.findOne({UserName}).select("+Password")
        if(!user){
            res.status(401)
            .json({message:'No User Found'})
        }
        let isMatch = await user.comparePassword(Password)
        if(!isMatch){
            res.status(401)
            .json({message:'Password Mismatched'})
        }
        let token = await user.generateToken()
        res.status(200).json({message:'login success',token})
    } catch (error) {
        next(error)
    }   
}