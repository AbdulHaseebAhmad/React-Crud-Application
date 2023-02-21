import React , {useContext}from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../store/auth-context';
const Navigation = (props) => {

  const Ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {Ctx.isLoggedIn && (
          <li>
            <button onClick={Ctx.onLogOut}>Delete Session</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
