const BASE_URL = "https://api.mesto.coolplaces.nomoredomains.xyz";

class Auth {
  constructor(url) {
    this._url = url;
    this._headers = {
      "Content-Type": "application/json",
    };
  }

  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        const message = data.message || "Что-то пошло не так!";
        return Promise.reject(message);
      });
    }
  };

  register({ password, email }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._checkResult);
  }

  login({ password, email }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._checkResult);
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResult);
  }

}

const auth = new Auth(BASE_URL);

export default auth;
