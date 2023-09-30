import asyncError from 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import analysisRouter from './routes/analysis.js';
import logger from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 5000;


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// moving to the router to increase modularity
app.use('/api', analysisRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Requested resource not found"
  });
})

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})