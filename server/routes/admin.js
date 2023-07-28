const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../middlewares/auth");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

/**
 * auth middleware
 */
// const auth = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, jwtSecret);
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

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
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.redirect("/dashboard");
  } catch (err) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
});

router.get("/dashboard", auth, async (req, res) => {
  const details = {
    title: "Dashboard",
    description: "My personal blog page.",
  };
  res.render("admin/dashboard", { details });
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
