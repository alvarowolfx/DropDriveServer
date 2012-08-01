var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var SharedFile = new Schema({
    file_id            : ObjectId
  , md5                : { type : String , unique : true , index : true }
  , filenames          : { type : [String] , index : true }
  , size               : Number   
  , haveFileComplete   : [String]
  , haveFileIncomplete : [String]
  , onlineUsers        : [String]
});

exports.sharedFileSchema = SharedFile;

