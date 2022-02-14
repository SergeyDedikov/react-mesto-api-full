const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require("../errors/unauthorized-error");

const auth = (req, res, next) => {
  // извлекаем токен из куков запроса
  const token = req.cookies.jwt;

  if (!token) {
    return next(new Unauthorized("Необходима авторизация"));
  }

  let payload;

  try {
    // проверяем токен на подлинность
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "secret-string"
    );
  } catch (err) {
    return next(new Unauthorized("Некорректный токен"));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};

module.exports = auth;
