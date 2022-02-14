const { Schema, model } = require("mongoose");
const { isURL } = require("validator");

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
      validator: (v) => isURL(v),
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
