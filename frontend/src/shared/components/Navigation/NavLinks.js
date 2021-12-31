import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './Navlinks.module.css';

const NavLinks = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <ul className={classes['nav-links']}>
      <li>
        <NavLink to="/" activeClassName={classes.active} exact>
          All Users
        </NavLink>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <NavLink
            to={`/${authCtx.userId}/places`}
            activeClassName={classes.active}
            exact
          >
            My Places
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <NavLink to="/places/new" activeClassName={classes.active} exact>
            Add Place
          </NavLink>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li>
          <NavLink to="/auth" activeClassName={classes.active} exact>
            Login
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={authCtx.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
