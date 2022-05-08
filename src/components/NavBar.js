import { Route, Switch } from "react-router-dom";
import NavItem from './NavItem';

function NavBar(props) {
  return(
    <>
      <ul
        onClick={props.handlerClick} 
        className={`navbar ${props.isOpen 
          ? 'navbar_opened' 
          : ''}`}
      >
        <Switch>
          <Route path="/sign-in">
            <NavItem
              to="/sign-up"
              value="Регистрация"
              active="active"
            />
          </Route>
          <Route path="/sign-up">
            <NavItem
              to="/sign-in"
              value="Войти"
              active="active"
            />
          </Route>
          <Route exact path="/">
            <NavItem
              to="/"
              value={props.email}
              onClick={()=>console.log('go to profile')}
              active="active"
            />
            <NavItem
              to="/sign-in"
              value="Выйти"
              onClick={props.onSignOut}
            />
          </Route>
        </Switch>
      </ul>
      <button
        onClick={props.handlerClick} 
        className={`navbar__btn ${props.isOpen 
          ? 'navbar__btn_opened'
          : ''}`} 
      />
    </>
  );
}

export default NavBar;