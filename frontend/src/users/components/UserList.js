import React from 'react';
import Card from '../../shared/components/Card/Card';

import UserItem from './UserItem';
import classes from './UserList.module.css';

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No User Found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className={classes['users-list']}>
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placesCount={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UserList;
