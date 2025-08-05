// 1.Dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");


const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

//routes imported
const chickStockReqRoutes = require("./routes/chickStockReqRoutes.js");
const farmerRegisterRoutes = require("./routes/farmerRegisterRoutes.js");
const feedsRoutes= require("./routes/feedsRoutes.js");


const PORT = process.env.PORT || 3000;

//2.Instantiations
const app = express();
const path = require("path");

// 3.Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // all static files must be in the public folder
app.use(expressSession);

// passport setup
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 4.Configurations

//configuring the database
mongoose.connect(process.env.DATABASE);
mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open!");
  })
  .on("error", (error) => {
    console.error(`Connection error: ${error.message}`);
  });
  // setting the view engine to pug
app.set("view engine", "pug");
// setting views directory
app.set("views", path.join(__dirname, "views"));


/*/initialising passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());*/

// use imported routes
app.use("/", chickStockReqRoutes);
app.use("/",farmerRegisterRoutes);
app.use("/",feedsRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
