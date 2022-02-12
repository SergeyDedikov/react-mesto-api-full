import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurentUserContext, defaultUser } from "../contexts/CurrentUserContext";

import "../index.css";
import api from "../utils/api";
import auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import CrashTest from "./CrashTest";

function App() {
  const history = useHistory();

  // -- Переменная состояния авторизации
  const [loggedIn, setLoggedIn] = useState(false);

  // -- Переменная состояния профиля
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  // -- Состояние карточек
  const [cards, setCards] = useState([]);
  // -- Переменная состояния выбранной карточки
  const [selectedCard, setSelectedCard] = useState(null);

  // -- Переменные состояния попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isOk, setIsOk] = useState(null);
  const [message, setMessage] = useState(
    "Что-то пошло не так! Попробуйте ещё раз."
  );

  // -- Переменные состояний отправки данных
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Краш-тест сервера
  function getCrashTest() {
    console.log("Сейчас произойдёт перезагрузка сервера!");
    api.getCrash().catch((err) => console.log(err));
  }

  // -- Запрос данных с сервера
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // -- Проверяем токен пользователя
  function handleTokenCheck() {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          // меняем переменные состояния авторизации
          setLoggedIn(true);
          setCurrentUserEmail(res.email);
          // переходим на главную страницу
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!loggedIn) {
      handleTokenCheck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -- Регистрация пользователя
  function onRegister(data) {
    auth
      .register(data)
      .then((res) => {
        if (res.statusCode !== 400) {
          setMessage("Вы успешно зарегистрировались!");
          // -- показать попап Хорошо
          showInfoTooltip(true);
          setTimeout(() => {
            history.push("/sign-in");
          }, 2000);
        }
      })
      .catch((err) => {
        showInfoTooltip(false);
        setMessage(err);
      });
  }

  // -- Вход в систему
  function onLogin(data) {
    auth
      .login(data)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUserEmail(res.email);
      })
      .then(() => history.push("/")) // переходим на главную страницу
      .catch((err) => {
        showInfoTooltip(false);
        setMessage(err);
      });
  }

  // -- Выход из системы
  function onSignOut() {
    auth.logout();
    history.push("/sign-in");
    setLoggedIn(false);
    setCurrentUserEmail("");
  }

  // -- Обновление профиля

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .setUserInfo(userData)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // сброс текста кнопки Submit
        setIsLoading(false);
      });
  }

  // -- Обновление аватара

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        // сброс полей ввода формы и текста кнопки Submit
        setIsSubmitted(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // -- Лайки, лайки, лайки

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // -- Удаление карточки

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // -- Добавление новой карточки

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api
      .addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        // сброс полей ввода формы и текста кнопки Submit
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // -- Функции попапов

  function showInfoTooltip(set) {
    // -- отобразим инфо-попап
    setIsInfoTooltipOpen(true);
    // -- выберем его тип
    setIsOk(set);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setIsSubmitted(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setIsSubmitted(false);
  }

  function closeAllPopups() {
    // -- установим значения по умолчанию
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
    setTimeout(() => {
      setMessage("Что-то пошло не так! Попробуйте ещё раз.");
    }, 1000);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <CurentUserContext.Provider value={currentUser}>
      <Header
        currentUserEmail={currentUserEmail}
        onSignOut={onSignOut}
        loggedIn={loggedIn}
      />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Route path="/sign-up">
          <Register onRegister={onRegister} />
        </Route>
        <Route path="/sign-in">
          <Login onLogin={onLogin} />
        </Route>
        <Route path="/crash-test">
          <CrashTest getCrashTest={getCrashTest} />
        </Route>
      </Switch>

      <Footer />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isSubmitted={isSubmitted}
        isLoading={isLoading}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isSubmitted={isSubmitted}
        isLoading={isLoading}
      />
      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        isLoading={isLoading}
      />
      <InfoTooltip
        isOk={isOk}
        isOpen={isInfoTooltipOpen}
        message={message}
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurentUserContext.Provider>
  );
}

export default App;
