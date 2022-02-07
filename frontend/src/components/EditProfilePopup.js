import { useState, useEffect, useContext } from "react";
import { CurentUserContext } from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CurentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Получаем данные пользователя для полей формы
    if (currentUser && props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"edit-profile"}
      title={"Редактировать профиль"}
      textButtonSubmit={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input-container">
        <label className="form__field">
          <input
            value={name}
            onChange={handleChangeName}
            id="name"
            placeholder="Введите имя"
            className="form__input"
            type="text"
            name="name"
            required
            minLength="2"
            maxLength="40"
          />
          <span id="name-error" className="form__error"></span>
        </label>
        <label className="form__field">
          <input
            value={description}
            onChange={handleChangeDescription}
            id="job"
            placeholder="Расскажите немного о себе"
            className="form__input"
            type="text"
            name="job"
            required
            minLength="2"
            maxLength="200"
          />
          <span id="job-error" className="form__error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
