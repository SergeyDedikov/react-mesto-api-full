function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_card ${card ? "popup_opened" : ""}`}>
      <figure className="popup__card">
        <img
          className="popup__card-image"
          src={card ? card.link : ""}
          alt={card ? `На фотографии: ${card.name}` : ""}
        />
        <figcaption className="popup__card-info">
          <p className="popup__card-description">{card ? card.name : ""}</p>
          <button
            onClick={onClose}
            className="popup__close popup__close_card button"
            type="button"
          ></button>
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
