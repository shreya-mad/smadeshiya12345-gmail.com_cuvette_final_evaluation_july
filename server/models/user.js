const mongoDB=require('mongoose');
const userSchema=mongoDB.Schema({
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
    confirmpass:{
        type:String,
        required:true
    }
    
})
module.exports=mongoDB.model('User',userSchema);