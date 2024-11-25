import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error fetching data");
    res.status(404).json({ success: false, message: error });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res
      .status(201)
      .json({
        success: true,
        data: newProduct,
        message: "Product created succesfully",
      });
  } catch (error) {
    console.error("Error in creating product: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Unable to create product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      product,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Unable to find the data");
    res.status(404).json({ success: false, message: error.message });
  }
};
