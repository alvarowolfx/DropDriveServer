var Common = require('./util/Common');

var apiKeys = ['foo', 'bar', 'baz'];

var api = function(req, res, next){
  var key = req.query['api-key'];

  // key isnt present
  //if (!key) return next(Common.error(400, 'Missing Arguments','api key required'),400);
  
  // key is invalid
  //if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

  // all good, store req.key for route access
  req.key = key;
  next();
};

exports.api = api;