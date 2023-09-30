# SubSpace Internship Assignment - 30/09/2023

## Challenge - 1, 2 and 3

1. **GET / - Welcome Page**
   - **Description:** Welcome page of your application.

2. **GET /api/blog-stats - Blog Stats Endpoint**
   - **Description:** Provides data analysis of various blog statistics.
   - **Features:**
     - Total number of blogs.
     - Blog with the longest title.
     - Filtering and retrieval of blogs with the keyword "privacy."
     - Array of all the book titles.

3. **GET /api/blog-search - Blog Search Endpoint**
   - **Description:** Allows searching for blogs based on the title provided in the query.

These routes form the core functionality of your application, providing various features related to blogs and their statistics.

## Bonus Challenge

Implemented memoization for the API using Lodash documents [here](https://lodash.com/docs#memoize) as a resource, as I was not very familiar with memoization with lodash:

![Memoization](https://drive.google.com/uc?id=1uAFmwsrvV-mBD2uF1mRCUpV-Ca0DG8j_)

On the first hit, the response time for results was in the range of 1.5 - 2.05s.

On the second hit, the response time for results was in the range of 600 - 750ms, which is a huge improvement (approximately 50%) from the previous response times:

![Response Time Improvement](https://drive.google.com/uc?id=1mzHgkvLUlo2CiQguh-oA3o1uMfd-vRb5)