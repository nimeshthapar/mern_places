import React, { Fragment, useState } from 'react';

import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import classes from './MainNavigation.module.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../Backdrop/Backdrop';

const MainNavigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerOpen(false);
  };

  return (
    <Fragment>
      {drawerOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={drawerOpen} onClick={closeDrawerHandler}>
        <nav className={classes['main-navigation__drawer-nav']}>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className={classes['main-navigation__menu-btn']}
          onClick={openDrawerHandler}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className={classes['main-navigation__title']}>
          <Link to="/">MERN Places</Link>
        </h1>
        <nav className={classes['main-navigation__header-nav']}>
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
