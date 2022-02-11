const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require("../models/user");
const { OK_SUCCESS_CODE, CREATED_SUCCESS_CODE } = require("../utils/constants");
const NotFoundError = require("../errors/not-found-error");
const Unauthorized = require("../errors/unauthorized-error");

const getUsers = (req, res, next) =>
  User.find({})
    .then((users) => {
      res.status(OK_SUCCESS_CODE).send(users);
    })
    .catch(next);

const getUser = (req, res, next) => {
  const { userId } = req.params;
  return User.findById(userId)
    .orFail(
      new NotFoundError(`Пользователь с указанным _id ${userId} не найден`)
    )
    .then((user) => res.status(OK_SUCCESS_CODE).send(user))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  return User.findById(_id)
    .orFail(new NotFoundError(`Пользователь не определён`))
    .then((user) => res.status(OK_SUCCESS_CODE).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(CREATED_SUCCESS_CODE).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .orFail(new NotFoundError(`Пользователь с указанным ID не найден`))
    .then((user) => res.status(OK_SUCCESS_CODE).send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new NotFoundError(`Пользователь с указанным ID не найден`))
    .then((user) => res.status(OK_SUCCESS_CODE).send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new Unauthorized("Неправильные почта или пароль")
        );
      }
      // сравниваем хеши паролей
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          // хеши не совпали — отклоняем промис
          return Promise.reject(
            new Unauthorized("Неправильные почта или пароль")
          );
        }
        // аутентификация успешна — создадим токен на 7 дней
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "secret-string",
          {
            expiresIn: "7d",
          }
        );
        // вернём куку с токеном
        return res
          .cookie("jwt", token, {
            domain: 'mesto.coolplaces.nomoredomains.work',
            path: '/*',
            httpOnly: true,
            secure: true,
            sameSite: true,
            maxAge: 7 * 24 * 3600000,
          })
          .status(OK_SUCCESS_CODE)
          .send(user); // вернём статус и данные
      });
    })
    .catch(next);
};

const signout = (req, res) =>
  // очистим значение jwt в куках
  res
    .cookie("jwt", "")
    .status(OK_SUCCESS_CODE)
    .send({ message: "Вы вышли из системы" });

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  signout,
};
