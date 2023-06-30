require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const workoutRoutes = require("./routes/workout");



//express app
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workoutRoutes", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONG0_URI)
  .then(() => {
    //listen fpr requests
    app.listen(process.env.PORT, () => {
      console.log("DB connected and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
