import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/Modal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import useHttp from '../../shared/hooks/use-http';

const UserPlaces = () => {
  const [places, setPlaces] = useState([]);
  const { uid } = useParams();

  const {
    isLoading,
    error,
    sendRequest,
    clearError: userPlacesErrorModalHandler,
  } = useHttp();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${uid}`
        );

        setPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, uid]);

  const placeDeleteHandler = (deletePlaceId) => {
    setPlaces((prev) => prev.filter((place) => place.id !== deletePlaceId));
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal error={error} onClear={userPlacesErrorModalHandler} />
      )}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <PlaceList places={places} onDelete={placeDeleteHandler} />
    </Fragment>
  );
};

export default UserPlaces;
