import { useRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    if (props.isSubmitted) {
      avatarRef.current.value = "";
    }
  }, [props.isSubmitted]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name={"edit-avatar"}
      title={"Обновить аватар"}
      textButtonSubmit={props.isLoading ? "Сохранение..." : "Сохранить"}
    >
      <fieldset className="form__input-container">
        <label className="form__field">
          <input
            ref={avatarRef}
            id="avatar"
            className="form__input"
            type="url"
            name="avatar"
            placeholder="Ссылка на аватар"
            required
          />
          <span id="avatar-error" className="form__error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
