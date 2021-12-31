import React, { Fragment, useEffect, useState } from 'react';

import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/Modal/ErrorModal';
import UserList from '../components/UserList';
import useHttp from '../../shared/hooks/use-http';

const Users = () => {
  const [users, setUsers] = useState([]);
  const {
    isLoading,
    error,
    sendRequest: fetchRequest,
    clearError: userErrorModal,
  } = useHttp();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setUsers(data.users);
      } catch (err) {}
    };

    fetchUser();
  }, [fetchRequest]);

  return (
    <Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {error && <ErrorModal onClear={userErrorModal} error={error} />}
      <UserList items={users} />
    </Fragment>
  );
};

export default Users;
