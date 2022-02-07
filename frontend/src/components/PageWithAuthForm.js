import { useState } from "react";

function PageWithAuthForm(props) {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  function handleChange(e) {
    setInputValues((values) => {
      return { ...values, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      email: inputValues.email,
      password: inputValues.password,
    });
  }

  return (
    <section className="authentication">
      <form
        onSubmit={handleSubmit}
        name={`${props.name}`}
        className={`form form_${props.name}`}
      >
        <h3 className={`form__heading form__heading_type_authentication`}>
          {props.title}
        </h3>
        <fieldset className="form__input-container form__input-container_authentication">
          <label className="form__field">
            <input
              value={inputValues.email}
              onChange={handleChange}
              id={`email-${props.name}`}
              className="form__input form__input_theme_dark"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <span id="place-error" className="form__error"></span>
          </label>
          <label className="form__field">
            <input
              value={inputValues.password}
              onChange={handleChange}
              id={`password-${props.name}`}
              className="form__input form__input_theme_dark"
              type="password"
              name="password"
              placeholder="Пароль"
              required
            />
            <span id="link-error" className="form__error"></span>
          </label>
        </fieldset>
        <button
          className={`form__button form__button_authentication form__button_theme_dark button`}
          type="submit"
        >
          {props.textButtonSubmit}
        </button>
      </form>
      {props.children}
    </section>
  );
}

export default PageWithAuthForm;
