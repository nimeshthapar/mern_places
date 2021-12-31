import React, { useState, useContext, Fragment } from 'react';

import classes from './Auth.module.css';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import ErrorModal from '../../shared/components/Modal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ImageUpload from '../../shared/components/ImageUpload/ImageUpload';
import useForm from '../../shared/hooks/use-form';
import useHttp from '../../shared/hooks/use-http';
import AuthContext from '../../shared/store/auth-context';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

const Auth = () => {
  const [signUpMode, setsignUpMode] = useState(false);
  const authCtx = useContext(AuthContext);

  const {
    isLoading,
    error,
    sendRequest: sendAuthRequest,
    clearError: authErrorModalHandler,
  } = useHttp();
  const { formState, inputHandler, setFormData } = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = (e) => {
    if (signUpMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }

    setsignUpMode((prev) => !prev);
  };

  const submitAuthFormHandler = async (e) => {
    e.preventDefault();

    if (signUpMode) {
      try {
        const formData = new FormData();

        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append(
          'name',
          signUpMode ? formState.inputs.name.value : undefined
        );
        formData.append(
          'image',
          signUpMode ? formState.inputs.image.value : null
        );

        const responseData = await sendAuthRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          'POST',
          formData
        );

        authCtx.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendAuthRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        authCtx.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={authErrorModalHandler} />}
      <div className="center">
        <Card className={classes['authentication']}>
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>{signUpMode ? 'Signup' : 'Login'}</h2>
          <hr />
          <form onSubmit={submitAuthFormHandler}>
            {signUpMode && (
              <Input
                element="input"
                type="text"
                id="name"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a Name"
              />
            )}
            {signUpMode && (
              <ImageUpload
                id="image"
                center={true}
                onInput={inputHandler}
                errorText={'Please Provide an Image'}
              />
            )}
            <Input
              element="input"
              type="email"
              id="email"
              label="E-mail"
              validators={[VALIDATOR_EMAIL()]}
              onInput={inputHandler}
              errorText="Email Must contains @ symbol"
            />
            <Input
              element="input"
              type="password"
              id="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              onInput={inputHandler}
              errorText="Password must be atleast of 6 characters"
            />
            <Button type="submit" disabled={!formState.isValid}>
              {signUpMode ? 'SignUp' : 'Login'}
            </Button>
            <hr />
            <p>{signUpMode ? 'Already Have Account?' : 'Not have Account?'}</p>
            <Button type="button" onClick={switchModeHandler} inverse>
              {signUpMode ? 'Login' : 'SignUp'}
            </Button>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};

export default Auth;
