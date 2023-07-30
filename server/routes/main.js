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
      currRoute: "/",
    });
  } catch (err) {
    console.log(err);
  }
});

/**
 * GET/
 * VIEW POST
 */

router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) return res.redirect("/"); // redirecting to home when id not found
    post.body = post.body.replace(/\r?\n/g, "<br>");
    const details = {
      title: `${post.title}`,
      description: "My personal blogging website!",
    };
    res.render("post", { details, post, currRoute: `/post/${req.params.id}` });
  } catch (err) {
    console.log(err);
  }
});

/**
 * GET
 * About page
 */
router.get("/about", async (req, res) => {
  const details = {
    title: "About Me",
    description: "My personal blogging website!",
  };
  res.render("about", { details, currRoute: "/about" });
});

/**
 * GET/
 * Search Term
 */

router.post("/search", async (req, res) => {
  const details = {
    title: "Search",
    description: "My personal blogging website!",
  };
  try {
    const searchTerm = req.body.searchTerm;
    // console.log(searchTerm);
    const modifiedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    const blogs = await Post.find({
      $or: [
        { title: { $regex: new RegExp(modifiedSearchTerm, "i") } },
        { body: { $regex: new RegExp(modifiedSearchTerm, "i") } },
      ],
    });
    res.render("search", { details, blogs, currRoute: "/" });
    // res.send(searchTerm);
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
