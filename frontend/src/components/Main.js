import { useContext } from "react";
import { CurentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  // -- Подписываемся на контекст
  const currentUser = useContext(CurentUserContext);

  return (
    <main className="main">
      <section className="profile" aria-label="Профиль пользователя">
        <div className="profile__avatar-box">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
          <button
            onClick={props.onEditAvatar}
            className="profile__button profile__button_type_avatar button"
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfile}
            className="profile__button profile__button_type_edit button"
            type="button"
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__button profile__button_type_add button"
          type="button"
        ></button>
      </section>

      <section className="cards" aria-label="Карточки мест">
        <ul className="cards__list">
          {props.cards.map((cardItem) => (
              <Card
                key={cardItem._id}
                card={cardItem}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
