const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const { createUser, login } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-error");
const auth = require("./middlewares/auth");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// -- Auths routes
app.post("/signin", login);
app.post("/signup", createUser);

// -- Others routes
app.use(auth);
app.use(usersRoutes);
app.use(cardsRoutes);

app.use((req, res, next) => {
  next(new NotFoundError("Был запрошен несуществующий роут"));
});
app.use(errorHandler);

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // следующие опции нужно закомментировать для MongoDB <=v.4.2
  // useCreateIndex: true,
  // useFindAndModify: false,
});

module.exports = app;