var db = require('../config');
var bcrypt = require('bcrypt');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  intitialize: ()=>{
    this.on('creating', this.hashPassword);
  },
  comparePassword: (attemptedPassword, callback)=>{
    bcrypt.compare(attemptedPassword, this.get('password'), (err,isMatch)=> {
      callback(isMatch);
    });
  },
  hashPassword:()=>{
    return bcrypt.hash(this.get('password'), null, null).bind(this)
        .then((hash)=>{
          this.set('password', hash);
        })
  }
});

module.exports = User;
