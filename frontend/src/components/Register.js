import { Link } from "react-router-dom";
import PageWithAuthForm from "./PageWithAuthForm";

function Register({ onRegister }) {
  return (
    <PageWithAuthForm
      onSubmit={onRegister}
      name={"register"}
      title={"Регистрация"}
      textButtonSubmit={"Зарегистрироваться"}
    >
      <p className="authentication__text">
        Уже зарегистрированы?{" "}
        <span>
          <Link to="/sign-in" className="button link">
            Войти
          </Link>
        </span>
      </p>
    </PageWithAuthForm>
  );
}

export default Register;
