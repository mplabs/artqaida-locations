const ObjectId = require('mongodb').ObjectId;

class Location {
  constructor(db) {
    this.db = db.collection('locations');
  }

  create(location, cb) {
    this.db.insert(location, cb);
  }

  get(id, cb) {
    this.db.findOne({ _id: id }).fetch(cb);
  }
}

module.exports = Location;