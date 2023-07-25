const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const details = {
    title: "Souav Dubey Blogs",
    description: "My personal blogging website!",
  };
  res.render("index", { details });
});

module.exports = router;
