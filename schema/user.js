const {model, Schema}=require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let userSchema = new Schema ({
    UserName:{
        type:String,
        required:[true,'username is required in string'],
        unique:true
    },
    Password:{
        type:String,
        required:[true,'Password is required in string'],
        select:false,
        minlength:6
    }
},{timestamps:true},{

})




userSchema.pre('save', async function(){    //pre it is method save is a event
    if (!this.isModified("Password")) return next();
    const salt = await bcrypt.genSalt(10)               //we have used this to keep the password safe and secure 
    this.Password = await bcrypt.hash(this.Password,salt) //(install bcrypt and import and used salt is a varaiable  and hash is a method )
    
})

userSchema.methods.comparePassword=async function (pass) { //to compare the password we done this
    return await bcrypt.compare(pass,this.Password) //we are comparing the pass from backend and user
}


userSchema.methods.generateToken=async function () {
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn:'1h'}
    )
}


module.exports=model('user',userSchema)