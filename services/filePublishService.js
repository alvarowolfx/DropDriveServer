var Common = require('../util/Common');
var mongoose = require('mongoose');
var SharedFileSchema = require('../model/model.js').sharedFileSchema;
var connection = mongoose.createConnection('mongodb://localhost/dropdrive');
var SharedFile = connection.model('SharedFile',SharedFileSchema);

var filePublish = {
  publish : function(req, res){
  
    var md5 = req.query['md5'];
    var size = req.query['size'];
    var fileName = req.query['fileName'];
    var deviceID = req.query['deviceID'];
    var complete = req.query['complete'];
    
    if(!complete){
        complete = 0;
    }else{
        if(complete == 'false'){
            complete = 0;
        }else{
            complete = 1;
        }
    }
    
    if(!deviceID || !md5 || !fileName || !size){
        
        var buffer = "";
        
        if (!deviceID) buffer+="deviceID ";
        if (!fileName) buffer+="fileName ";
        if (!md5) buffer+="md5 ";
        if (!size) buffer+="size ";

        buffer+='required';
        
        res.send(Common.error(400, 'Missing arguments',buffer),400);
        return;
    }
    
    //Verificar se o fileName começa com letras.
    //TODO
    
    SharedFile.findOne({ md5 : md5 } , function(err,doc){
        
        if(doc){   
            var hasChanges = false;
            if(!~doc.filenames.indexOf(fileName)){
                doc.filenames.push(fileName);   
                hasChanges = true;
            }
            if(complete){
                 if(!~doc.haveFileComplete.indexOf(deviceID)){
                    doc.haveFileComplete.push(deviceID);
                    hasChanges = true;
                 }
                 if(~doc.haveFileIncomplete.indexOf(deviceID)){
                    doc.haveFileIncomplete.pop(deviceID);
                    hasChanges = true;
                 }
            }else{
                if(!~doc.haveFileIncomplete.indexOf(deviceID)){
                    doc.haveFileIncomplete.push(deviceID);
                    hasChanges = true;
                }
                if(~doc.haveFileComplete.indexOf(deviceID)){
                    doc.haveFileComplete.pop(deviceID);
                    hasChanges = true;
                }
            }
            
            if(hasChanges){
                doc.save();
            }
            res.send(Common.response(200,'File updated with sucess',{file : doc}),200);
            
        }else{   
        
             var sfile = new SharedFile;
             sfile.md5 = md5;
             sfile.filenames.push(fileName);
             sfile.size = size;
             if(complete){
                 sfile.haveFileComplete.push(deviceID);
             }else{
                 sfile.haveFileIncomplete.push(deviceID);
             }
             sfile.save();    
             
             res.send(Common.response(200,'File published with sucess',{file : sfile}),200);
        }    
    });
     
  },
  unpublish : function(req, res){
  
    var md5 = req.query['md5'];
    var deviceID = req.query['deviceID'];
        
    if(!deviceID || !md5 ){
        
        var buffer = "";
        
        if (!deviceID) buffer+="deviceID ";        
        if (!md5) buffer+="md5 ";

        buffer+='required';
        
        res.send(Common.error(400, 'Missing arguments',buffer),400);
        return;
    }
    
    SharedFile.findOne({ md5 : md5 } , function(err,doc){
        
        if(doc){   
            
           if(doc.haveFileComplete.indexOf(deviceID)){
                doc.haveFileComplete.pop(deviceID);
           }
           if(doc.haveFileIncomplete.indexOf(deviceID)){
               doc.haveFileIncomplete.pop(deviceID);
           }
       
            doc.save();
       
            res.send(Common.response(200,'File unpublisehd with sucess',{file : doc}),200);
            
        }
    });
    
  }
  
};

exports.publishService = filePublish;