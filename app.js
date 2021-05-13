const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/Api/products");

const {
  logErrors,
  clientErrorHandler,
  errorHandler,
}=require('./utils/middlewares/errorHandlers')

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static",express.static(path.join(__dirname, "public")));

app.get("/", (req,res)=>{
  res.redirect('/products')
});
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
module.exports = app;
