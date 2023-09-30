import express from "express";
import blogStatsMiddleware from "../middleware/blogStatsMiddleware.js";
import blogSearchMiddleware from "../middleware/blogSearchMiddleware.js";

const router = express.Router();

router
  .route("/blog-stats")
  //getting the middleware function to calculate the stats
  .get(blogStatsMiddleware, async (req, res) => {

    //responding to the request from here
    console.log("You have hit the responding function");

    if (req.blogStats === undefined) {
      return res.status(500).json({
        message: 'Something went wrong'
      });
    }

    return res.json({
      statistics: req.blogStats
    });
  });

router
  .route("/blog-search")
  .get(blogSearchMiddleware, async (req, res) => {
    //responding to the request from here
    console.log("You have hit the responding function");

    if (req.matchingBlogs === undefined) {
      return res.status(500).json({
        message: 'Something went wrong'
      });
    }

    return res.json({
      matchingBlogs: req.matchingBlogs,
    });
  });

export default router;
