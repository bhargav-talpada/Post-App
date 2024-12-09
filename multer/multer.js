const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{ //this is used to store the file by giving name
        cb(null,'public/images') //this is the path to store the img
    },
    filename:(req,file,cb)=>{ //this will store the file in the db
        cb(null,Date.now() + file.originalname) 
        // const name= Date.now() + file.originalname
        // cb(null,name)
        // req.body.post =name
    }
})

const photos=multer({storage:storage})
module.exports=photos;