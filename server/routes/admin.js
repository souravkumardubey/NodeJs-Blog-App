const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";
/**
 * GET
 * Admin - Login
 */
router.get("/admin", async (req, res) => {
  try {
    const details = {
      title: "Admin",
      description: "My personal blogging website!",
    };
    res.render("admin/index", { details, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

/**
 * POST
 * Admin - Login Step
 */
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    // res.render("admin/index", { details, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

/**
 * POST
 * Admin - Register
 */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({
        username,
        password: hashedPassword,
      });
      res.status(200).json({ message: "User register successfully!", user });
    } catch (err) {
      if (err.code === 11000)
        return res
          .status(409)
          .json({ message: "User with this username already exists" });
      return res.status(409).json("Internal server error");
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
