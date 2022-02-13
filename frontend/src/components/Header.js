import { useEffect, useState } from "react";
import logo from "../images/logo-mesto.svg";
import ButtonsNav from "./ButtonsNav";

export default function Header({ loggedIn, currentUserEmail, onSignOut }) {
  // -- Управляем отображением верхней части хидера
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  const containerMobilVisible = `header__container-mobil ${
    loggedIn && isVisibleMenu && "header__container-mobil_visible"
  }`;

  useEffect(() => {
    if (!loggedIn) {
      // если выйдем из системы с раскрытым меню, то спрячем его
      setIsVisibleMenu(false);
    }
  }, [loggedIn]);

  function onChangeVisibleMenu() {
    setIsVisibleMenu(!isVisibleMenu);
  }

  return (
    <header className="header">
      <div className={containerMobilVisible}>
        <p className="header__user-email header__user-email_mobil">{currentUserEmail}</p>
        <button
          onClick={onSignOut}
          className="button link signout signout_place_header"
          type="button"
        >
          Выйти
        </button>
      </div>
      <div className="header__container-general">
        <img className="header__logo" src={logo} alt="Логотип Место.Россия" />
        <p className="header__user-email">{currentUserEmail}</p>
        <nav className="header__nav">
          <ButtonsNav
            onSignOut={onSignOut}
            onChangeVisibleMenu={onChangeVisibleMenu}
            isVisibleMenu={isVisibleMenu}
          />
        </nav>
      </div>
    </header>
  );
}
