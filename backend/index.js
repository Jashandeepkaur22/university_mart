import mongoose from "mongoose"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createuniversity, DeleteUniversity, GetUnuiversity, Updateuniversity } from "./controllers/university.js";
import multer from "multer";
import {  CreateProduct, DeleteProduct, GetProductDetails, GetProductsByDepartment, UpdateProduct } from "./controllers/Products.js";
import { createDepartment, DeleteDepartment, GetDepartment, UpdateDepartment } from "./controllers/department.js";
import { ChangePassword, EditProfile, login, Register } from "./controllers/User.js";

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());

//University module
//http://localhost:8081/university
const storageUniv=multer.diskStorage({
    destination:"uploadsUniv/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadsUniv=multer({
    storage:storageUniv,
});

app.post("/university",uploadsUniv.single("image"),createuniversity);
app.put("/university",uploadsUniv.single("image"),Updateuniversity);
app.delete("/university",DeleteUniversity);
app.get("/university",GetUnuiversity);



//department module  // //http://localhost:8081/department
const storageDep = multer.diskStorage({
    destination:"uploadDep/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadsDep = multer({
    storage:storageDep
});
app.post("/department",uploadsDep.single("image"),createDepartment);
app.put("/department",uploadsDep.single("image"),UpdateDepartment);
app.delete("/department",DeleteDepartment);
app.get("/department",GetDepartment);

 
//product module
const storagePrd = multer.diskStorage({
    destination:"uploadPrds/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadsPrd = multer({
    storage:storagePrd
});
//http://localhost:8081/product
app.post("/product",uploadsPrd.array("images"),CreateProduct);
app.put("/product",uploadsPrd.array("images"),UpdateProduct);
app.delete("/product",DeleteProduct);
app.get("/product",GetProductsByDepartment);
app.get("/productDetails",GetProductDetails);
// app.put("/UpdatePoduct",UpdateProductQty);




//user model   
 app.post("/register",Register);
 app.post("/login",login);
app.put("/password",ChangePassword );
app.put("/editprofile",EditProfile );


app.use(express.static("uploadsUniv/"));
app.use(express.static("uploadDep/"));
app.use(express.static("uploadPrds/"));


mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("database connect");
    app.listen(process.env.PORT,()=>{
        console.log("server is running:"+process.env.PORT);
    });
}).catch((e)=>{
    console.log("Database Not Connect");
})