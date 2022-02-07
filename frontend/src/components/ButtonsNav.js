import { Link, useLocation } from "react-router-dom";

export default function ButtonsNav({
  onSignOut,
  onChangeVisibleMenu,
  isVisibleMenu,
}) {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return (
      <>
        <button
          onClick={onSignOut}
          className="button link signout signout_place_nav"
          type="button"
        >
          Выйти
        </button>
        <button
          onClick={onChangeVisibleMenu}
          // -- меняем вид кнопки
          className={`button header__burger-menu ${
            isVisibleMenu && "header__burger-menu_close"
          }`}
          type="button"
        ></button>
      </>
    );
  } else if (pathname === "/sign-up") {
    return (
      <Link to="/sign-in" className="button link">
        Войти
      </Link>
    );
  } else if (pathname === "/sign-in") {
    return (
      <Link to="/sign-up" className="button link">
        Регистрация
      </Link>
    );
  } else {
    return null;
  }
}
