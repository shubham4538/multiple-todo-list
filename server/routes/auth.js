const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  try {
    if (user) {
      res.status(409).json({ error: "User already exists!" });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = UserModel({ username, password: hashedPass });
      await newUser.save();
      res.status(200).json({ success: "Signed-Up Successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    res.status(404).json({ error: "User doesn't exists!" });
  } else {
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      res.status(401).json({ error: "User credentials Incorrect!" });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.status(200).json({
        success: "Signed-Up Successfully",
        token,
        username: user.username,
      });
    }
  }
});

module.exports = authRouter;
