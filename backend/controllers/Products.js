//  CORRECTED BACKEND FILE

import ProductModel from "../models/product.js";

// CREATE PRODUCT
export const CreateProduct = async (req, res) => {
  try {
    const images = req?.files?.map((item) => { return  item.filename; }); // OK
    const prdData = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      qty: req.body.qty,
      images: images,
      department: req.body.departmentId,
    });
    if (prdData) res.status(201).send({ message: "Product created" });
    else res.status(404).send({ message: "Unable to create" });
  } catch (error) {
  console.log(error?.message);
  }
};

//  UPDATE PRODUCT
export const UpdateProduct = async (req, res) => {
  try {
    const image = req?.files?.map((item) => item.filename); // OK
    const prData = await ProductModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        qty: req.body.qty,
        image: image,
        department: req.body.department,
      }
    );
    if (prData) res.status(200).send({ message: "Product updated" });
    else res.status(404).send({ message: "Unable to update" });
  } catch (error) {
    console.log("UpdateProduct Error:", error.message);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

//  DELETE PRODUCT
export const DeleteProduct = async (req, res) => {
  try {
    const prData = await ProductModel.deleteOne({ _id: req.body.id });
    if (prData.deletedCount > 0) res.status(200).send({ message: "Product deleted" });
    else res.status(404).send({ message: "Unable to delete" });
  } catch (error) {
    console.log("DeleteProduct Error:", error.message);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

// GET PRODUCTS BY DEPARTMENT
export const GetProductsByDepartment = async (req, res) => {
  try {
    const prdData = await ProductModel.find({
      department: req.query.departmentId,
    }).populate({
      path: "department",
      populate: [{ path: "university" }],
    });
    res.status(200).send({ prdData });
  } catch (error) {
    console.log("GetProductsByDepartment Error:", error.message);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

//  FIXED: GetProductDetails (was Reg.query.id, should be req.query.id)
export const GetProductDetails = async (req, res) => {
  try {
    const prdData = await ProductModel.findOne({ _id: req.query.id }).populate({
      path: "department",
      populate: [{ path: "university" }],
    });
    res.status(200).send({ prdData });
  } catch (error) {
    console.log("GetProductDetails Error:", error.message);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

//  FIXED: UpdateProductQty had broken logic
export const UpdateProductQty = async (req, res) => {
  try {
    const productInDb = await ProductModel.findOne({ _id: req.body.id });

    let active = true;
    if (productInDb.qty - req.body.qty <= 0) {
      active = false;
    }

    const updated = await ProductModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        qty: productInDb.qty - req.body.qty,
        active: active,
      },
      { new: true }
    );

    if (updated) res.status(200).send({ message: "Product qty updated" });
    else res.status(404).send({ message: "Unable to update" });
  } catch (error) {
    console.log("UpdateProductQty Error:", error.message);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};
