# Практическая работа №15: "Место". Бэкенд + фронтенд.

- Описание
- Особенности
- Ссылка на проект

---

**Описание**

Теперь у нас есть полностью функциональное приложение.

В этом проекте клиентская часть приложения, реализованная с помощью `React`, объединена с серверной частью, построенной на `Express` с базой данных `MongoDB`.

Фронтенд и бэкенд запущены на разных доменах, на одной виртуальной машине с системой `Ubuntu`.

Приложение имеет возможности: авторизация и регистрация пользователей, операции с карточками и пользователями.

---

**Особенности**

Имеется обработчик запросов `CORS`, который даёт доступ только с определённого домена:

```javascript
// middlewares/cors-handler.js
// проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header("Access-Control-Allow-Origin", origin);
    // разрешаем запросы с учётными данными
    res.header("Access-Control-Allow-Credentials", true);
  }
```

Теперь все запросы фиксируются и документируются с помощью логгеров на основе Node-модулей `winston` и `express-winston`:

```javascript
// middlewares/logger.js
// создадим логгер запросов
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "./logs/request.log" })],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "./logs/error.log" })],
  format: winston.format.json(),
});
```

Установлен лимит запросов обращений к серверу `express-rate-limit`:

```javascript
// middlewares/rate-limit.js
const rateLimit = require("express-rate-limit");

// лимит запросов
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // за 10 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
```

---

**Ссылка на проект**

Посмотреть реализацию проекта `Место` можно [по ссылке >>>](https://mesto.coolplaces.nomoredomains.work)

Подключение к серверу для ревьюверов `Я.Практикума`:

serded59@178.154.206.41 || praktikum@178.154.206.41
