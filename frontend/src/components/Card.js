import { useContext } from "react";
import { CurentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__button-remove ${
    !isOwn && "card__button-remove_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__button-like ${
    isLiked && "card__button-like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li>
      <figure className="card">
        <img
          className="card__photo"
          src={card.link}
          alt={`На фотографии: ${card.name}`}
          onClick={handleClick}
        />
        <figcaption className="card__info">
          <h2 className="card__description">{card.name}</h2>
          <div className="card__likes-box">
            <button
              onClick={handleLikeClick}
              className={`${cardLikeButtonClassName} button`}
              type="button"
            ></button>
            <p className="card__likes-count">{card.likes.length}</p>
          </div>
          <button
            onClick={handleDeleteClick}
            className={`${cardDeleteButtonClassName} button`}
            type="button"
          ></button>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;
