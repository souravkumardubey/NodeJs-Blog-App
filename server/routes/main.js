const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
/**
 * GET/
 * HOME
 */
router.get("/", async (req, res) => {
  try {
    const details = {
      title: "Souav Dubey Blogs",
      description: "My personal blogging website!",
    };
    const postsPerPage = 5;
    let page = req.query.page || 1;

    const blogs = await Post.aggregate([{ $sort: { createdOn: -1 } }])
      .skip(page * postsPerPage - postsPerPage)
      .limit(postsPerPage)
      .exec();

    const count = await Post.count();
    const nextPage = +page + 1;
    const hasNextPage = nextPage <= Math.ceil(count / postsPerPage);
    res.render("index", {
      details,
      blogs,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (err) {
    console.log(err);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const details = {
//       title: "Souav Dubey Blogs",
//       description: "My personal blogging website!",
//     };
//     const blogs = await Post.find();
//     res.render("index", { details, blogs });
//   } catch (err) {
//     console.log(err);
//   }
// });

// const insertToDB = () => {
//   Post.insertMany([
//     {
//       title: "Blog 2",
//       body: "My second blog!!",
//     },
//   ]);
// };
// insertToDB();

module.exports = router;
