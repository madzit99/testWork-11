import mongoose, { Schema, Types } from "mongoose";
import User from "./User";

const ItemSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: "User does not exist",
    },
  },
  title: {
    type: String,
    requireq: true,
  },
  description: {
    type: String,
    requireq: true,
  },
  price: {
    type: Number,
    requireq: true,
  },
  image: {
    type: String,
    requireq: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});


const Item = mongoose.model("Item", ItemSchema);

export default Item;