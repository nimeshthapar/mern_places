const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/user');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', userController.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  userController.postSignUp
);

router.post(
  '/login',
  [check('email').isEmail(), check('password').isLength({ min: 6 })],
  userController.postLogin
);

module.exports = router;