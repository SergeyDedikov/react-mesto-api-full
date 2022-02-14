const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);

router.get(
  "/users/me",
  celebrate({
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
  }),
  getCurrentUser
);

router.get(
  "/users/:userId",
  celebrate({
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
    params: Joi.object().keys({
      userId: Joi.string().required().length(24),
    }),
  }),
  getUser
);

router.patch(
  "/users/me",
  celebrate({
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
      })
      .unknown(true),
  }),
  updateUser
);

router.patch(
  "/users/me/avatar",
  celebrate({
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
    body: Joi.object()
      .keys({
        avatar: Joi.string()
          .required()
          .pattern(
            /^https?:\/\/w?w?w?\.?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]#?/
          ),
      })
      .unknown(true),
  }),
  updateAvatar
);

module.exports = router;
