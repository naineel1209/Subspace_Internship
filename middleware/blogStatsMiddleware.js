import _ from 'lodash';
import { config } from 'dotenv';
config();

const options = {
  method: 'GET',
  headers: {
    'x-hasura-admin-secret': process.env.HASHURA_SECRET,
  }
};

//blogsStatsMiddleware function to calculate the stats of the blogs and store them in an array of objects
const blogStatisticalMiddleware = async (req, res, next) => {
  console.log("You have hit middleware function");

  let blogs = [];
  let totalBlogs = 0;
  let longestBlogTitle = {};
  let privacyBlogsCount = 0;
  let uniqueBlogTitles = [];


  //checking if the secret key is present in the request header
  if (options.headers['x-hasura-admin-secret'] === undefined) {
    return res.status(500).json({
      message: 'Some key is missing'
    });
  }

  const memoizedFetch = _.memoize(async function () {
    fetch('https://intent-kit-16.hasura.app/api/rest/blogs', options)
      .then(response => response.json())
      .then(response => {
        if (typeof response.blogs === "object") {
          blogs = response.blogs;
          // console.log(blogs);

          //calculating the total number of blogs
          totalBlogs = blogs.length;
          // console.log(totalBlogs);

          //finding the blog title with max length using maxBy length
          longestBlogTitle = _.maxBy(blogs, (blog) => {
            return blog.title.length;
          });
          // console.log(longestBlogTitle);

          //finding the number of blogs with privacy as word in the title using filter
          privacyBlogsCount = _.filter(blogs, (blog) => {
            return _.includes(blog.title.toLowerCase(), 'privacy');
          }).length;
          // console.log("privacy count: " + privacyBlogsCount);

          //creating array of unique blog titles
          uniqueBlogTitles = _.uniqBy(blogs, "title");
          // console.log(uniqueBlogTitles);
          // console.log(uniqueBlogTitles.length);

          //creating the object to be sent as response
          req.blogStats = {
            totalBlogs: totalBlogs,
            longestBlogTitle: longestBlogTitle,
            privacyBlogsCount: privacyBlogsCount,
            uniqueBlogTitles: uniqueBlogTitles
          }

          next();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          message: err.message || 'Something went wrong'
        });
      });
  });

  memoizedFetch();

  // fetch('https://intent-kit-16.hasura.app/api/rest/blogs', options)
  //   .then(response => response.json())
  //   .then(response => {
  //     if (typeof response.blogs === "object") {
  //       blogs = response.blogs;
  //       // console.log(blogs);

  //       //calculating the total number of blogs
  //       totalBlogs = blogs.length;
  //       // console.log(totalBlogs);

  //       //finding the blog title with max length using maxBy length
  //       longestBlogTitle = _.maxBy(blogs, (blog) => {
  //         return blog.title.length;
  //       });
  //       // console.log(longestBlogTitle);

  //       //finding the number of blogs with privacy as word in the title using filter
  //       privacyBlogsCount = _.filter(blogs, (blog) => {
  //         return _.includes(blog.title.toLowerCase(), 'privacy');
  //       }).length;
  //       // console.log("privacy count: " + privacyBlogsCount);

  //       //creating array of unique blog titles
  //       uniqueBlogTitles = _.uniqBy(blogs, "title");
  //       // console.log(uniqueBlogTitles);
  //       // console.log(uniqueBlogTitles.length);

  //       //creating the object to be sent as response
  //       req.blogStats = {
  //         totalBlogs: totalBlogs,
  //         longestBlogTitle: longestBlogTitle,
  //         privacyBlogsCount: privacyBlogsCount,
  //         uniqueBlogTitles: uniqueBlogTitles
  //       }

  //       next();
  //     } else {
  //       throw new Error("Something went wrong");
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return res.status(500).json({
  //       message: err.message || 'Something went wrong'
  //     });
  //   });
}

export default blogStatisticalMiddleware;