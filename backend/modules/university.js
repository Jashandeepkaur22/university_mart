import mongoose from "mongoose"
const universitySchema=new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    image:
    {
        type:String,
        required:true,
    },
},
{timestamps:true}
);
const universityModel=mongoose.model("university",universitySchema);
export default universityModel;