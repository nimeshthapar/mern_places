const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Place = require('../models/place');
const User = require('../models/user');
const HttpError = require('../models/http-error');
const getCoordinatesForAddress = require('../util/location');

exports.getPlaceByPlaceId = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong. Couldn't find Place, Please try Again",
        500
      )
    );
  }

  if (!place) {
    return next(
      new HttpError("Couldn't find places for provided place ID", 404)
    );
  }

  res.json({ place: place.toObject({ getters: true }) });
};

exports.getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate('places');
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong. Couldn't find Place, Please try Again",
        500
      )
    );
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new HttpError("Couldn't find places for provided user ID", 404)
    );
  }

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

exports.postNewPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid Input Passed', 422));
  }

  const { title, description, address } = req.body;

  const location = await getCoordinatesForAddress(address);

  const createdPlace = new Place({
    title,
    description,
    location,
    address,
    creator: req.userData.userId,
    imageURL: req.file.path.replace(/\\/g, '/'),
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(
      new HttpError('Creating new Place Failed, Please Try Again', 500)
    );
  }

  if (!user) {
    return next(
      new HttpError("Couldn't create place for provided user ID", 422)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Creating new Place Failed, Please Try Again', 500)
    );
  }

  res.status(201).json({
    places: createdPlace.toObject({ getters: true }),
  });
};

exports.updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid Input Passed', 422));
  }

  const placeId = req.params.pid;
  const { title, description } = req.body;

  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError('Updating new Place Failed, Please Try Again', 500)
    );
  }

  if (!updatedPlace) {
    return next(
      new HttpError("Couldn't find places for provided place ID", 404)
    );
  }

  if (updatedPlace.creator.toString() !== req.userData.userId) {
    return next(new HttpError('You are not allowed to edit this place', 401));
  }

  updatedPlace.title = title;
  updatedPlace.description = description;
  try {
    await updatedPlace.save();
  } catch (err) {
    return next(
      new HttpError('Updating new Place Failed, Please Try Again', 500)
    );
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

exports.deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (err) {
    return next(
      new HttpError('Deleting new Place Failed, Please Try Again', 500)
    );
  }

  if (!place) {
    return next(
      new HttpError("Couldn't find places for provided place ID", 404)
    );
  }

  if (place.creator.id !== req.userData.userId) {
    return next(new HttpError('You are not allowed to delete this place', 401));
  }

  const imagePath = place.imageURL;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    place.remove({ session });
    place.creator.places.pull(place);
    await place.creator.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Deleting new Place Failed, Please Try Again', 500)
    );
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ places: 'Successfully Deleted' });
};
