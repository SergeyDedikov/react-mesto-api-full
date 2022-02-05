const {
  BADREQUEST_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  CONFLICT_ERROR_CODE,
} = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  const { code, name, message } = err;

  if (
    (name === "MongoServerError" || name === "MongoError") &&
    code === 11000
  ) {
    res
      .status(CONFLICT_ERROR_CODE)
      .send({ message: "Пользователь с данным email уже существует" });
  } else {
    switch (name) {
      case "CastError":
        res
          .status(BADREQUEST_ERROR_CODE)
          .send({ message: "Переданы некорректные данные" });
        break;
      case "ValidationError":
        res.status(BADREQUEST_ERROR_CODE).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(". ")}`,
        });
        break;
      case "NotFoundError":
        res.status(NOTFOUND_ERROR_CODE).send({ message });
        break;
      case "Unauthorized":
        res.status(UNAUTHORIZED_ERROR_CODE).send({ message });
        break;
      case "Forbidden":
        res.status(FORBIDDEN_ERROR_CODE).send({ message });
        break;
      default:
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
    }
  }

  next();
};

module.exports = errorHandler;
