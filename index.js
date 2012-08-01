var express = require('./node_modules/express')
  , verbose = process.env.NODE_ENV != 'test'
  , app = module.exports = express()
  , authService = require('./services/authenticationService').authenticationService
  , publishService = require('./services/filePublishService').publishService
  , searchService = require('./services/fileSearchService').searchService
  , userService = require('./services/userService').users
  , api = require('./api').api;
  
app.use('/api', api);
app.use(app.router);

app.use(function(err, req, res, next){
    console.log('Funcão de erros 500');
    console.log(err);
  res.send(err.meta.code || 500, err);
});

app.use(function(req, res){
  res.send(404, { error: "Lame, can't find that" });
});

app.map = function(a, route){
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      // { '/path': { ... }}
      case 'object':
        app.map(a[key], route + key);
        break;
      // get: function(){ ... }
      case 'function':
        if (verbose) console.log('%s %s', key, route);
        app[key](route, a[key]);
        break;
    }
  }
};



app.map({
  '/api' :  {
      '/auth' : {
           get : authService.authenticate
       },
       '/heartbeat' : {
           get : authService.heartbeat
       },
       '/publish' : {
           get : publishService.publish
       },
       '/search' : {
           get : searchService.search
       },
       '/users' : {
           get : userService.online
       }
       
  }
});

app.listen(3000);