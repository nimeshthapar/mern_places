import React, { Fragment, lazy, useContext, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoadingSpinner from './shared/components/LoadingSpinner/LoadingSpinner';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import AuthContext from './shared/store/auth-context';
// import NewPlaces from './places/pages/NewPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
// import UserPlaces from './places/pages/UserPlaces';
// import Auth from './users/pages/Auth';
// import Users from './users/pages/Users';

const Users = lazy(() => import('./users/pages/Users'));
const NewPlaces = lazy(() => import('./places/pages/NewPlaces'));
const UpdatePlace = lazy(() => import('./places/pages/UpdatePlace'));
const UserPlaces = lazy(() => import('./places/pages/UserPlaces'));
const Auth = lazy(() => import('./users/pages/Auth'));

function App() {
  const authCtx = useContext(AuthContext);
  let routes;

  if (authCtx.isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new">
          <NewPlaces />
        </Route>
        <Route path="/places/:pid">
          <UpdatePlace />
        </Route>
        <Route path="/:uid/places">
          <UserPlaces />
        </Route>
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:uid/places">
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    );
  }

  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </main>
    </Fragment>
  );
}

export default App;
