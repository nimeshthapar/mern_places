import React from 'react';

import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import PlaceItem from './PlaceItem';
import classes from './PlaceList.module.css';

const PlaceList = (props) => {
  if (props.places.length === 0) {
    return (
      <div className={`${classes['place-list']} center`}>
        <Card>
          <h2>No Places Found. Maybe Create one?</h2>
          <Button to="/places/new">Add a Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className={classes['place-list']}>
      {props.places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageURL}
          title={place.title}
          description={place.description}
          creatorId={place.creator}
          address={place.address}
          coordinates={place.location}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
