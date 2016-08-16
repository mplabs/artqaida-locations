const express = require('express');
const router = express.Router();

module.exports = function(app) {

  router.use('/', require('./pages')(app));
  router.use('/locations', require('./locations')(app));

  return router;
}