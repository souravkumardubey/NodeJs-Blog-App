const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

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
module.exports = router;
