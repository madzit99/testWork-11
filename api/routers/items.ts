import express from "express";
import Item from "../models/Item";
import auth, { RequestWithUser } from "../middleware/auth";
import { imageUpload } from "../multer";

const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res, next) => {
  try {
    const items = await Item.find().populate("user", "username");

    if (!items) {
      return res.status(404).send({ error: "Item not found" });
    }

    return res.send(items);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.get("/:id", async (req, res, next) => {
  try {
    const OneItem = await Item.findById(req.params.id)
      .populate("user", "username displayName phoneNumber ")
      .populate("category", "title");

    if (!OneItem) {
      return res.status(404).send({ error: "Item not found" });
    }

    res.send(OneItem);
  } catch (error) {
    return next(error);
  }
});

itemsRouter.get("/category/:id", async (req, res, next) => {
  try {
    const items = await Item.find({ category: req.params.id }).populate(
      "user",
      "username"
    );

    if (!items) {
      return res.status(404).send({ error: "Item not found" });
    }

    return res.send(items);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.post(
  "/",
  auth,
  imageUpload.single("image"),
  async (req: RequestWithUser, res, next) => {
    try {
      const itemData = {
        user: req.user?._id,
        title: req.body.title,
        description: req.body.description,
        price: parseFloat(req.body.price),
        image: req.file ? req.file.filename : null,
        category: req.body.category,
      };

      const item = new Item(itemData);
      await item.save();

      return res.send(item);
    } catch (error) {
      return next(error);
    }
  }
);

itemsRouter.delete("/:id", auth, async (req: RequestWithUser, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).send({ error: "Item not found" });
    }

    if (item.user.toString() !== req.user?._id.toString()) {
        return res.status(403).send("You have no rights")
    }

    await Item.findByIdAndDelete(req.params.id) 
    return res.send("Product removed");
  } catch (error) {}
});

export default itemsRouter;