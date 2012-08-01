var Common = require('../util/Common');
var redis = require('redis'),
    client = redis.createClient();
    
var userService = {
  online : function(req, res){
            
    client.keys("peers:*", function (err, reply) {
        
        var usuarios = new Array();
        for(var i in reply){
            usuarios.push(reply[i].split(':')[1]);
        }
        res.send(Common.response(200,'Users online list',{ users : usuarios }),200);
    });
    
  },
  onlineUsersList : function(cb){
      console.log('Executou a função de usuários online');
      client.keys("peers:*", function (err, reply) {
        
        var usuarios = new Array();
        for(var i in reply){
            usuarios.push(reply[i].split(':')[1]);
        }
        cb(usuarios);
    });
      
  }
};

exports.users =  userService;
