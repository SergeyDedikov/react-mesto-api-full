const rateLimit = require("express-rate-limit");

// лимит запросов
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // за 10 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

module.exports = limiter;
