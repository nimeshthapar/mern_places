import React, { Fragment, useState, useContext } from 'react';

import Card from '../../shared/components/Card/Card';
import Button from '../../shared/components/Button/Button';
import Map from '../../shared/components/Map/Map';
import classes from './PlaceItem.module.css';
import Modal from '../../shared/components/Modal/Modal';
import AuthContext from '../../shared/store/auth-context';
import useHttp from '../../shared/hooks/use-http';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/Modal/ErrorModal';

const PlaceItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    isLoading,
    error,
    sendRequest,
    clearError: deleteErrorModalHandler,
  } = useHttp();

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  const openDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  const confirmDeleteModalHandler = async () => {
    setShowDeleteModal(false);
    console.log('DELETING....');

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );

      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={deleteErrorModalHandler} />}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass={classes['place-item__modal-content']}
        footerClass={classes['place-item__modal-actions']}
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className={classes['map-container']}>
          <Map
            lat={props.coordinates.lat.toString()}
            lng={props.coordinates.lng.toString()}
          />
        </div>
      </Modal>

      <Modal
        show={showDeleteModal}
        onCancel={closeDeleteModalHandler}
        header={'Are you sure?'}
        contentClass={classes['place-item__modal-content']}
        footerClass={classes['place-item__modal-actions']}
        footer={
          <Fragment>
            <Button onClick={closeDeleteModalHandler} inverse>
              Cancel
            </Button>
            <Button onClick={confirmDeleteModalHandler} danger>
              Confirm
            </Button>
          </Fragment>
        }
      >
        <Fragment>
          <p>
            Do you want to proceed and delete this place? Please note that it
            can't be undone thereafter.
          </p>
        </Fragment>
      </Modal>

      <li className={classes['place-item']}>
        <Card className={classes['place-item__content']}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className={classes['place-item__image']}>
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className={classes['place-item__info']}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={classes['place-item__actions']}>
            <Button inverse onClick={openMapHandler}>
              View on Map
            </Button>
            {authCtx.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {authCtx.userId === props.creatorId && (
              <Button danger onClick={openDeleteModalHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
