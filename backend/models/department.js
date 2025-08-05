import mongoose from "mongoose";
const Departmentschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    university:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,            
        ref:"university",
    },
},
{timestamps:true}
)
const DepartmentModel=mongoose.model("department",Departmentschema);
export default DepartmentModel;
    