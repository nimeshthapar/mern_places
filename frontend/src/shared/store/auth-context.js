import React, { createContext, useCallback, useState, useEffect } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: (uid, token, expirationTime) => {},
  logout: () => {},
});

let logOutTimer;
export const AuthProvider = (props) => {
  const [token, setToken] = useState(false);
  const [tokenExpTime, setTokenExpTime] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationTime) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationTime =
      expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpTime(tokenExpirationTime);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationTime.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpTime(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpTime) {
      const remainingTime = tokenExpTime.getTime() - new Date().getTime();
      logOutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logOutTimer);
    }
  }, [token, logout, tokenExpTime]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedUserData &&
      storedUserData.token &&
      new Date(storedUserData.expiration) > new Date()
    ) {
      login(
        storedUserData.userId,
        storedUserData.token,
        new Date(storedUserData.expiration)
      );
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
