const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

// const setHeaders = require('./middleware/set-headers');
const HttpError = require('./models/http-error');
const placeRoutes = require('./routes/place');
const userRoutes = require('./routes/user');

const app = express();

const PORT = 5000;
const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hfbiv.mongodb.net/${process.env.MONGO_NAME}`;

app.use(express.json());

app.use(
  '/uploads/images',
  express.static(path.join(__dirname, 'uploads', 'images'))
);

app.use(express.static(path.join('public')));

// app.use(setHeaders);

app.use('/api/places', placeRoutes);

app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// app.use((req, res, next) => {
//   throw new HttpError("Couldn't find this route.", 404);
// });

app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(err);
  }

  res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'an unexpexted error occured' });
});

mongoose
  .connect(URI)
  .then(() => {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server Listening at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
