const mongoose=require('mongoose');
var Schema=mongoose.Schema;

var User=new Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        defaule:false
    }

});


module.exports=mongoose.model('users',User);