var Keyword = require('../models/keyword')

module.exports = {
  createKeyword: (data, cb)=>{
    new Event(data).save().then((keyword)=>{
      cb(keyword);
    });
  }
}
