import mongoose from "mongoose"
const ProuctSchema=new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    description:
    {
        type:String,
        required:true,
    },
    price:
    {
        type:Number,
        required:true,
    },
    qauntity:
    {
        type:Number,
        required:true,
    },
    activa:
    {
        type:Boolean,
        default:true,
    },
    image:
    {
        type:[String],
        required:true,
    },
    department:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"department",
        required:true,
    },
},
{timestamps:true}
);
const ProductModel=mongoose.model("product",ProuctSchema)
export default ProductModel;
