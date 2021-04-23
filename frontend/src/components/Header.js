import headerLogo from "../images/logo-white.svg";
import { Route, Link, Switch } from "react-router-dom";

function Header({ loggedIn, email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место-логотип" />

      <ul className="header__items">
        <Switch>

          <Route path="/sign-up">
            <li className="header__item header__item-link">
              <Link className="header__link" to="/sign-in">Войти</Link>
            </li>
          </Route>

          <Route path="/sign-in">
            <li className="header__item header__item-link">
              <Link className="header__link" to="/sign-up">Регистрация</Link>
            </li>
          </Route>

          {loggedIn ? (
            <>
              <li className="header__item">{email}</li>
              <li className="header__item header__item-link" onClick={onSignOut}>
                Выйти
              </li>
            </>
          ) : (
            ""
          )}
        </Switch>
      </ul>
    </header>
  );
}

export default Header;
