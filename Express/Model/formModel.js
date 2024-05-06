const mongoose=require('mongoose');

const formModel=mongoose.model("prForm",new mongoose.Schema({
    name:{type:String,require:true},
    phone:{type:String,require:true},
    address:{type:String,require:true},
    dob:{type:String,require:true},
pass:{type:String,require:true},
gender:{type:String,require:true},

})) 

module.exports= formModel;