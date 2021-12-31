import React, { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import ErrorModal from '../../shared/components/Modal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ImageUpload from '../../shared/components/ImageUpload/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import './NewPlaces.css';
import useForm from '../../shared/hooks/use-form';
import useHttp from '../../shared/hooks/use-http';
import AuthContext from '../../shared/store/auth-context';

const NewPlaces = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const {
    isLoading,
    error,
    sendRequest: sendPlaceData,
    clearError: newPlaceErroModalHandler,
  } = useHttp();

  const { formState, inputHandler } = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);

      await sendPlaceData(
        `${process.env.REACT_APP_BACKEND_URL}/places/`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      history.push('/'); //`/${responseData.places.id}/places`
    } catch (err) {}
  };

  return (
    <Fragment>
      {error && <ErrorModal onClear={newPlaceErroModalHandler} error={error} />}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element="input"
          id="title"
          label="Title"
          type="text"
          errorText="Please Enter a Valid Title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          errorText="Please Enter a Valid Description (at leaset 5 character)"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Input
          id="address"
          type="text"
          element="input"
          label="Address"
          errorText="Please Enter a Valid Address"
          validators={[VALIDATOR_REQUIRE(5)]}
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText={'Please Provide an Image'}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </Fragment>
  );
};

export default NewPlaces;
