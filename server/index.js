const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const db = require('../database/index.js');
const Photo = require('../database/Model/Photo.js');

const app = express();
const PORT = process.env.PORT || 3002;

app.use('/:id', express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect(301, `http://localhost:${PORT}/index.html`);
});

app.get('/photos/:listing_id', (req, res) => {
  const id = req.params.listing_id;
  Photo.getAllPhotos(id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

app.patch('/update', (req, res) => {
  let { liked, id } = req.body;
  Photo.updateLikeStatus(id, liked, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}...`);
});

module.exports = app;

// Uncomment to download random pics
// const autoDownload = (count) => {
//   axios({
//     method: 'GET',
//     url: 'https://loremflickr.com/1920/1080/hotel,room',
//     responseType: 'stream',
//   })
//     .then((response) => {
//       response.data.pipe(fs.createWriteStream(`./sampleImages/${count}.jpg`));
//     });
// };

// for (let i = 0; i < 250; i += 1) {
//   autoDownload(i);
// }
