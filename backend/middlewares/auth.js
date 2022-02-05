const jwt = require("jsonwebtoken");

const Unauthorized = require("../errors/unauthorized-error");
const Forbidden = require("../errors/forbidden-error");

const auth = (req, res, next) => {
  // извлекаем токен из куков запроса
  const token = req.cookies.jwt;

  if (!token) {
    return next(new Forbidden("Необходима авторизация"));
  }

  let payload;

  try {
    // проверяем токен на подлинность
    payload = jwt.verify(token, "secret-string");
  } catch (err) {
    return next(new Unauthorized("Некорректный токен"));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};

module.exports = auth;
