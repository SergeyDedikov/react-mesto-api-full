const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards);

router.post(
  "/cards",
  celebrate({
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/^https?:\/\/w?w?w?\.?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]#?/),
    }),
  }),
  createCard
);

router.delete(
  "/cards/:cardId",
  celebrate({
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
  deleteCard
);

router.put(
  "/cards/:cardId/likes",
  celebrate({
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
  likeCard
);

router.delete(
  "/cards/:cardId/likes",
  celebrate({
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
  dislikeCard
);

module.exports = router;
