import universityModel from "../models/university.js";


export const createuniversity=async(req,res)=>{
    try {
        const univData=await universityModel.create({
            name:req.body.name,
            image:req?.file?.filename,
     }); 
     if(univData)res.status(201).send({message:"university Created"});
     else res.status(404).send({message:"unable to  not Created"});
    } catch (error) {
        console.log("fail to submit data");
    }
};
export const Updateuniversity=async(req,res)=>{
    try {
        const univData=await universityModel.findByIdAndUpdate(
            {_id:req.body.id},
            {
            name:req.body.name,
            image:req?.file?.filename,
     });if(univData)res.status(200).send({message:"university Update"});
     else res.status(404).send({message:"university not Update"});
    } catch (e) {
        console.log("fail to submit data")
    }
};
export const DeleteUniversity=async(req,res)=>{
    try {
        const univData=await universityModel.deleteOne();
        if(univData)
            res.status(200).send({messade:"unable to deleted"});
    } catch (error) {
        console.log("fail to submit data")
    }
}
export const GetUnuiversity=async(req,res)=>{
    try {
        const univData=await universityModel.find();
        if(univData)
            res.status(200).send({univData});
    } catch (error) {
        console.log("fail to submit"); 
    }
}