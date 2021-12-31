import React, { useEffect, useReducer } from 'react';
import classes from './Input.module.css';
import { validate } from '../../util/validators';

const enteredValueReducer = (state, action) => {
  if (action.type === 'CHANGE') {
    return {
      ...state,
      entered: action.val,
      isValid: validate(action.val, action.validators),
    };
  }

  if (action.type === 'TOUCH') {
    return {
      ...state,
      isTouched: true,
    };
  }

  return state;
};

const Input = (props) => {
  const [value, dispatchValue] = useReducer(enteredValueReducer, {
    entered: props.value || '',
    isValid: props.valid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { entered, isValid } = value;

  useEffect(() => {
    onInput(id, entered, isValid);
  }, [id, entered, isValid, onInput]);

  const changeHandler = (e) => {
    dispatchValue({
      type: 'CHANGE',
      val: e.target.value,
      validators: props.validators,
    });
  };

  const blurHandler = (e) => {
    dispatchValue({
      type: 'TOUCH',
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={entered}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={entered}
      />
    );

  return (
    <div
      className={`${classes['form-control']} ${
        !value.isValid && value.isTouched && classes['form-control--invalid']
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      <p>{!value.isValid && value.isTouched && props.errorText}</p>
    </div>
  );
};

export default Input;
