require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { celebrate, Joi, errors } = require("celebrate");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const { createUser, login, signout } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-error");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const corsHandler = require("./middlewares/cors-handler");
const limiter = require("./middlewares/rate-limit");

const app = express();
const {
  PORT = 3000,
  DB_PATH = `mongodb://localhost:27017/mestodb`
} = process.env;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use(corsHandler); // обработаем CORS-запросы

// -- Auths routes
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.get("/signout", signout);

// -- Others routes
app.use(auth);
app.use(usersRoutes);
app.use(cardsRoutes);

app.use((req, res, next) => {
  next(new NotFoundError("Был запрошен несуществующий роут"));
});

app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // следующие опции нужно закомментировать для MongoDB <=v.4.2
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
