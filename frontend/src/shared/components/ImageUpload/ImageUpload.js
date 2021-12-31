import React, { useRef, useState, useEffect } from 'react';

import classes from './ImageUpload.module.css';
import Button from '../Button/Button';

const ImageUpload = (props) => {
  const inputPickerRef = useRef();

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);

  const pickImageHandler = () => {
    inputPickerRef.current.click();
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickUpChangeHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files || e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className={classes['form-control']}>
      <input
        id={props.id}
        ref={inputPickerRef}
        type="file"
        style={{ display: 'none' }}
        accept=".jpg,.jpeg,.png"
        onChange={pickUpChangeHandler}
      />
      <div
        className={`${classes['image-upload']} ${
          props.center && classes['center']
        }`}
      >
        <div className={classes['image-upload__preview']}>
          {previewUrl && <img src={previewUrl} alt="preveiw" />}
          {!previewUrl && <p>Please Pick an Image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
