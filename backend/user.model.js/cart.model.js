const mongoose=require("mongoose")

//user schema
const cartSchema=mongoose.Schema({
   
        image:String,
        name:String,
        price:String
    
},{
    versionKey:false
})

const cartmodel=mongoose.model("cartdata",cartSchema)

module.exports={
    cartmodel
}