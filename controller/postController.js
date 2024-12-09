const postSchema=require('../schema/schema')
exports.createPost = async(req,res)=>{
    let payload = {
        post:req.file.path,
        postedBy:req.body.postedBy,
        description:req.body.description
    }
    await postSchema.create(req.body)
    res.status(201)
    .json({success:true,message:'Successfully inserted',payload})
}

exports.allPosts=async(req,res)=>{
    let payload = await postSchema.find({})
    res.status(200)
    .json({success:true,message:'Successfully Retrieved',payload})
}

exports.singlePost=async(req,res)=>{
    let payload = await postSchema.findOne({_id:req.params.id})
    res.status(200)
    .json({success:true,message:'Successfully Retrieved Single Post',payload})
}

exports.updatePost=async(req,res)=>{
    const post =req.file.path;
    const data=req.body;
    let payload = await postSchema.updateOne({_id:req.params.id},{$set:{post,...data}}) 
    res.status(200)
    .json({success:true,message:'Successfully Update Single Post',payload})
}

exports.DeletePost=async(req,res)=>{
    let payload = await postSchema.deleteOne({_id:req.params.id})
    res.status(200)
    .json({success:true,message:'Successfully Deleted Single Post',payload})
}