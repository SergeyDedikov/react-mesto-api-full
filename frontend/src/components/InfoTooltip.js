function InfoTooltip(props) {
  // переменная для `className` содержимого попапа
  const popupBackgroundClassName = `popup__background ${
    props.isOk ? "popup__background_succes" : "popup__background_fail"
  }`;

  // меняем текст в зависимости от статуса
  const message = props.isOk
    ? "Вы успешно зарегистрировались!"
    : `${props.message}`;

  return (
    <div
      className={`
        popup popup_type_infotooltip
        ${props.isOpen ? "popup_opened" : ""}
      `}
    >
      <div className={`popup__container popup__container_type_infotooltip`}>
        <div className={popupBackgroundClassName} />
        <h3 className="popup__message">{message}</h3>
        <button
          onClick={props.onClose}
          className="popup__close button"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
