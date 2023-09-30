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
const blogSearchMiddleware = async (req, res, next) => {
  console.log("You have hit middleware function");

  //checking if the query is present in the request
  const { query } = req.query;
  console.log(query);

  if (query === undefined || query === '') {
    return res.status(500).json({
      message: 'query is missing'
    });
  }

  let blogs = [];
  let matchingBlogs = [];

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

          //finding the blogs with matching query using filter
          matchingBlogs = _.filter(blogs, (blog) => {
            return _.includes(blog.title.toLowerCase(), query.toLowerCase());
          });

          req.matchingBlogs = matchingBlogs;

          next();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          message: err.message || 'Something went wrong'
        });
      });
  })

  memoizedFetch();
}

export default blogSearchMiddleware;