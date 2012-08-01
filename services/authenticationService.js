var Common = require('../util/Common');
var redis = require('redis'),
    client = redis.createClient(),multi;
    
var authService = {
  authenticate : function(req, res){
  
    var login = req.query['login'];
    var password = req.query['password'];
    var deviceID = req.query['deviceID'];
    
    if(!deviceID){
        res.send(Common.error(400, 'Missing arguments','deviceID required'),400);
        return;
    }
    
    multi = client.multi();
    multi.set('peers:'+deviceID,new Date());
    multi.expire('peers:'+deviceID,60);
    
     multi.exec(function (err, replies) {
        console.log('Updating user time online');
        console.log(replies);
    });
    
    res.send(Common.response(200,'User authenticate with sucess',{}),200);
    
  },
  heartbeat : function(req, res){
  
    var deviceID = req.query['deviceID'];
    
    if(!deviceID){
        res.send(Common.error(400, 'Missing arguments','deviceID required'),400);
        return;
    }
    
    multi = client.multi();
    multi.set('peers:'+deviceID,new Date());
    multi.expire('peers:'+deviceID,60);
    
     multi.exec(function (err, replies) {
        console.log('Updating user time online');
        console.log(replies);
    });
    
    res.send(Common.response(200,'User authenticate with sucess',{}),200);
    
  }
};

exports.authenticationService = authService;