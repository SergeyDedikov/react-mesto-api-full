import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  // -- Общий стэйт для полей ввода
  const [inputValues, setInputValues] = useState({ place: "", link: "" });

  function handleChange(e) {
    setInputValues((values) => {
      return { ...values, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: inputValues.place,
      link: inputValues.link,
    });
  }

  useEffect(() => {
    // Очищаем поля ввода после отправки
    if (props.isSubmitted) {
      setInputValues({ place: "", link: "" })
    }
  }, [props.isSubmitted]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name={"add-place"}
      title={"Новое место"}
      textButtonSubmit={props.isLoading ? "Сохранение..." : "Создать"}
    >
      <fieldset className="form__input-container">
        <label className="form__field">
          <input
            value={inputValues.place}
            onChange={handleChange}
            id="place"
            className="form__input"
            type="text"
            name="place"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span id="place-error" className="form__error"></span>
        </label>
        <label className="form__field">
          <input
            value={inputValues.link}
            onChange={handleChange}
            id="link"
            className="form__input"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="link-error" className="form__error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
