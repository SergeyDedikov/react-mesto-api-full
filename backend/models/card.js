const { Schema, model } = require("mongoose");

const checkUrl = require("../utils/check-url");

const cardSchema = new Schema({
  name: {
    type: String,
    required: [true, "Название места обязательно"],
    minlength: [2, "Слишком короткое нзвание"],
    maxlength: [30, "Слишком длинное название"],
  },
  link: {
    type: String,
    required: [true, "Должна быть указана ссылка"],
    validate: {
      validator: (v) => checkUrl(v),
      message: "Неправильный формат ссылки",
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("card", cardSchema);
