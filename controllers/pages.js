const express = require('express');
const router = express.Router();

module.exports = function(app) {
  
  router.get('/', (req, res) => {
    res.render('index');
  });

  return router;
}