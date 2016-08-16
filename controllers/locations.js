const express = require('express');
const router = express.Router();
const Location = require('../models/location');

module.exports = function(app) {
  const location = new Location(app.locals.db);

  router.get('/bounds', (req, res) => {
    var southWest = req.query.southWest;
    var northEast = req.query.northEast;
    
    res.send({ southWest: southWest, northEast: northEast });
  });

  return router;
}