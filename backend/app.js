const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const { createUser, login, signout } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-error");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require ('./middlewares/cors-handler');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(corsHandler); // обработаем CORS-запросы

// -- Auths routes
app.post("/signin", login);
app.post("/signup", createUser);
app.get('/signout', signout);

// -- Others routes
app.use(auth);
app.use(usersRoutes);
app.use(cardsRoutes);

app.use((req, res, next) => {
  next(new NotFoundError("Был запрошен несуществующий роут"));
});

app.use(errorLogger);
app.use(errorHandler);

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // следующие опции нужно закомментировать для MongoDB <=v.4.2
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
