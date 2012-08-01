var Common = require('../util/Common');
var UserService = require('./userService').users;
var mongoose = require('mongoose');
var SharedFileSchema = require('../model/model.js').sharedFileSchema;
var connection = mongoose.createConnection('mongodb://localhost/dropdrive');
var SharedFile = connection.model('SharedFile',SharedFileSchema);

var searchService = {
  search : function(req, res){
  
    var query = req.query['query'];

    SharedFile.find({ filenames : {$regex : new RegExp(query, "i") } } , function(err,docs){       
       if(docs.length > 0){
           UserService.onlineUsersList( function (usuarios){               
               for(var i in docs){
                   docs[i].onlineUsers = [];
                   for(var j in usuarios){
                       if(include(docs[i].haveFileComplete,usuarios[j]) || 
                           include(docs[i].haveFileIncomplete,usuarios[j])){
                           
                           docs[i].onlineUsers.push(usuarios[j]);
                           
                       }
                   }
               }
               res.send(Common.response(200,'Found this files',{files : docs }),200);
           });                                
       }else{
           res.send(Common.response(404,'No files found',{}),404);
       }
        
    });
     
  }
};

function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return true;
    }
}
exports.searchService = searchService;