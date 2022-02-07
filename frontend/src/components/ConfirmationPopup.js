import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"confirmation"}
      title={"Вы уверены?"}
      textButtonSubmit={props.isLoading ? "Ожидайте..." : "Да"}
    />
  );
}

export default ConfirmationPopup;
