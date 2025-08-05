// import DepartmentModel from  

import DepartmentModel from "../models/department.js";

export const createDepartment=async(req,res)=>{
    try {
        const depData=await DepartmentModel.create({
            name:req.body.name,
            image:req?.file?.filename,
            university:req.body.universityId,
     });
     if(depData)res.status(201).send({message:"DEpartment Created"});
     else res.status(404).send({message:"unable to create departments"});
    } catch (error) {
        console.log("fail to submit data");
    }
};
export const UpdateDepartment=async(req,res)=>{
    try {
        const depData=await DepartmentModel.findByIdAndUpdate(
            {_id:req.body.id},
            {
                name:req.body.name,
            image:req?.file?.filename,
            university:req.body.universityId,
     });
     if(depData) res.status(200).send({message:"Department Update"});
     else res.status(404).send({message:"Department not Update"});
    } catch (e) {
        console.log("fail to submit data")
    }
};
export const DeleteDepartment=async(req,res)=>{
    try {
        const depData=await DepartmentModel.deleteOne( {_id:req.body.id});
        if(depData)
            res.status(200).send({messade:"unable to deleted"});
    } catch (error) {
        console.log("fail to submit data")
    }
};
export const GetDepartment=async(req,res)=>{
    try {
        const depData=await DepartmentModel.find({university:req.query.universityId}).populate("university");
      res.status(200).send({depData});
    }
    catch (error) {
        console.log("fail to submit"); 
    }
};