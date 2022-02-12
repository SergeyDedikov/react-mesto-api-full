const BASE_URL = "https://api.mesto.coolplaces.nomoredomains.xyz";

class Api {
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

  getCardList() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResult);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResult);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResult);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResult);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResult);
  }

  deleteCard(card) {
    return fetch(`${this._url}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResult);
  }

  changeLikeCardStatus(card, isLiked) {
    return fetch(`${this._url}/cards/${card._id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResult);
  }

  getCrash() {
    return fetch(`${this._url}/crash-test`, {
      method: "GET",
      //  headers: this._headers,
    }).then(this._checkResult);
  }
}

const api = new Api(BASE_URL);

export default api;
