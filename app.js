const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config.json');
const hb = require('express-handlebars');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Setup app
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup view engine
app.engine('handlebars', hb({ defaultLayout: 'master' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

MongoClient.connect(config.database.url, (err, db) => {
  app.locals.db = db;

  app.use(require('./controllers')(app));

  app.listen(config.server.port, config.server.host, () => {
    console.log("App is running on", config.server.port, config.server.host, "...");
  });
});