var db = require('../config');
var Route = require('./route');

var Keyword = db.Model.extend({
  tableName: 'keyword',
     routes: ()=> {
     return this.belongsToMany(Route);
   },
  hasTimestamps: true
});

module.exports = Keyword;


// var Book = bookshelf.Model.extend({
//   tableName: 'books',
//   routes: function() {
//     return this.belongsToMany(Route);
//   }
// });

// var Author = bookshelf.Model.extend({
//   tableName: 'authors',
//   books: function() {
//     return this.belongsToMany(Book);
//   }
// });
