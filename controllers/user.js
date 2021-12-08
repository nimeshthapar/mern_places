const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const HttpError = require('../models/http-error');

exports.getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return next(new HttpError('Fetching User Failed, Please Try Again', 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return next(new HttpError('Please Enter valid Credentials', 422));
  }

  const { email, password } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Logging up failed, Please Try Again', 500));
  }

  if (!identifiedUser) {
    return next(new HttpError('User not found, Please Check Credentials', 401));
  }

  let matchPassword = false;
  try {
    matchPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    return next(new HttpError('Something went wrong, Please Try Again', 500));
  }

  if (!matchPassword) {
    return next(
      new HttpError('Incorrect Password, Please Check Credentials', 401)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Something went wrong, Please Try Again', 500));
  }

  res.json({
    message: 'successfully logged in',
    userId: identifiedUser.id,
    token: token,
  });
};

exports.postSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return next(new HttpError('Please Enter valid Credentials', 422));
  }
  const { email, password, name } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Signing up failed, Please Try Again', 500));
  }

  if (existingUser) {
    return next(new HttpError('User already exist, Try to Login', 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Something went wrong, Please Try Again', 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path.replace(/\\/g, '/'),
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(
      new HttpError('Creating new User Failed, Please Try Again', 500)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'weeeeaaaaboooo',
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Something went wrong, Please Try Again', 500));
  }

  res
    .status(201)
    .json({ userId: createdUser.id, token: token, email: createdUser.email });
};
