const express = require('express');
const { check } = require('express-validator');

const placesController = require('../controllers/places');
const fileUpload = require('../middleware/file-upload');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/:pid', placesController.getPlaceByPlaceId);

router.get('/user/:uid', placesController.getPlacesByUserId);

router.use(isAuth);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  placesController.postNewPlace
);

router.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  placesController.updatePlace
);

router.delete('/:pid', placesController.deletePlace);

module.exports = router;
