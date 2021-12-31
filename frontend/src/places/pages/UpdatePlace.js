import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useForm from '../../shared/hooks/use-form';
import './NewPlaces.css';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/Input/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import useHttp from '../../shared/hooks/use-http';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/Modal/ErrorModal';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../shared/store/auth-context';

const UpdatePlace = () => {
  const [loadedPlace, setLoadedPlace] = useState();
  const authCtx = useContext(AuthContext);
  const {
    isLoading,
    error,
    sendRequest,
    clearError: updatePlaceErrorModalHandler,
  } = useHttp();
  const { pid } = useParams();
  const history = useHistory();

  const { formState, inputHandler, setFormData } = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${pid}`
        );

        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, pid, setFormData]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2 className="pad">Couldn't find place</h2>
        </Card>
      </div>
    );
  }

  const editPlaceFormSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${pid}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        }
      );

      history.push(`/${authCtx.userId}/places`);
    } catch (err) {}
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal error={error} onClear={updatePlaceErrorModalHandler} />
      )}
      {!isLoading && loadedPlace && (
        <form className={'place-form'} onSubmit={editPlaceFormSubmitHandler}>
          <Input
            type="text"
            element="input"
            id="title"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a Valid Title"
            onInput={inputHandler}
            value={loadedPlace.title}
            valid={true}
          />
          <Input
            element="textarea"
            id="description"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Enter a Valid Description(at least 5 characters)"
            onInput={inputHandler}
            value={loadedPlace.description}
            valid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdatePlace;
