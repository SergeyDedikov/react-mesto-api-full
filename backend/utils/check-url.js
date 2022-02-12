function checkUrl(str) {
  return /^https?:\/\/w?w?w?\.?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]#?/gi.test(str);
}

module.exports = checkUrl;
