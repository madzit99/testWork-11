import express from "express";
import User from "../models/User";
import mongoose from "mongoose";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    user.generateToken();
    await user.save();
    res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

userRouter.post("/sessions", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(422).send({ error: "Username or password is wrong!!" });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: "Username or password is wrong!!" });
    }
    user.generateToken();
    await user.save();

    return res.send({ message: "Username and password are correct!", user });
  } catch (e) {
    next(e);
  }
});

userRouter.delete("/sessions", async (req, res, next) => {
  try {
    const headerValue = req.get("Authorization");

    if (!headerValue) return res.status(204).send();

    const [_bearer, token] = headerValue.split(" ");

    if (!token) return res.status(204).send();

    const user = await User.findOne({ token });

    if (!user) return res.status(204).send();

    user.generateToken();
    await user.save();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default userRouter;
