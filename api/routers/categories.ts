import express from "express";
import Category from "../models/Category";
import mongoose from "mongoose";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.get("/:id", async (req, res, next) => {
  try {
    const Onecategory = await Category.findById(req.params.id);
    
    if (!Onecategory) {
      return res.status(404).send({ error: "Category not found" });
    }

    res.send(Onecategory);
  } catch (error) {
    return next(error);
  }
});

export default categoriesRouter;
