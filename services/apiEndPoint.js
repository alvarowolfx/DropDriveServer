var Common = require('../util/Common');
    
var apiEndPoint = {
  online : function(req, res){
            
    res.send(Common.response(200,'DropDrive api is Online',{ versions : ['v1']}),200);    
    
  },
  v1 : function(req,res){
  
     res.send(Common.response(200,'DropDrive api v1 is Online',{}),200);
     
  }
};

exports.apiEndPoint =  apiEndPoint;