const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config.json');
const exphbs = require('express-handlebars');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Setup app
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup view engine
app.engine('html', exphbs({
  defaultLayout: 'master',
  extname: 'html'
}));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Static routing
app.use(express.static('public'));

MongoClient.connect(config.database.url, (err, db) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  app.locals.db = db;

  app.use(require('./controllers')(app));

  app.listen(config.server.port, config.server.host, () => {
    console.log("App is running on", config.server.port, config.server.host, "...");
  });
});