const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const checkUrl = require("../utils/check-url");

const userSchema = new Schema({
  name: {
    type: String,
    minlength: [2, "Слишком короткое имя"],
    maxlength: [30, "Слишком длинное имя"],
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: [2, "Недостаточно информации о себе"],
    maxlength: [30, "Слишком много информации о себе"],
    default: "Исследователь",
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (v) => checkUrl(v),
      message: "Неправильный формат ссылки",
    },
  },
  email: {
    type: String,
    required: [true, "Поле email не должно быть пустым"],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Неправильный формат email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// уберём поле пароля из отдаваемого объекта
// при регистрации нового пользователя
userSchema.methods.toJSON = function noShowProtectedKeys() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = model("user", userSchema);
