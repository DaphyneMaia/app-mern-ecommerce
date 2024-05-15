import express from "express";
import Product from "../Models/products.js";
import mongoose from "mongoose";
const router = express.Router();

router.use(express.json());

//Get products from database
router.get("/", async (req, res) => {
  const productList = await Product.find();
  res.send(JSON.stringify(productList));
});

//Get a single product by id
router.get("/:id", async (req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  res.send(JSON.stringify(product));
});

//Post new product
router.post("/create", async (req, res) => {
    try {
      const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        discountPercentage: req.body.discountPercentage,
        rating: req.body.rating,
        stock: req.body.stock,
        brand: req.body.brand,
        category: req.body.category,
        thumbnail: req.body.thumbnail,
        images: req.body.images,
      });
  
      await newProduct.save();
      res.status(201).send("Product saved to the database!");
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).send("Internal Server Error");
    }

});
//Update a product
router.put("/update/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndUpdate(product_id, {
    title: req.body.data.title,
    description: req.body.data.description,
    price: req.body.data.price,
    discountPercentage: req.body.data.discountPercentage,
    rating: req.body.data.rating,
    stock: req.body.data.stock,
    brand: req.body.data.brand,
    category: req.body.data.category,
    thumbnail: req.body.data.thumbnail,
    images: req.body.data.images,
  });

  res.send("Product updated successfully!");
});

//Delete a product
router.delete("/delete/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndDelete(product_id);
  res.send("Product deleted!");
});

export default router;