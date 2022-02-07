import PageWithAuthForm from "./PageWithAuthForm";

function Login({ onLogin }) {
  return (
    <PageWithAuthForm
      onSubmit={onLogin}
      name={"login"}
      title={"Вход"}
      textButtonSubmit={"Войти"}
    />
  );
}

export default Login;
