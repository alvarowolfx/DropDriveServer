function response(status, msg,content) {
  var resp = {
     meta : {
         code : status,
         message : msg
     },
     response : content
  };
  return resp;
}

function error(status, errorType,errorDetail) {
  var err = {
     meta : {
         code : status,
         errorType : errorType,
         errorDetail : errorDetail
     },
     response : {}
  };
  return err;
}

exports.error = error;
exports.response = response;