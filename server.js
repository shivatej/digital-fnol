//Install express server
var fs          = require('fs');
var path        = require('path');
var express     = require('express');
var app         = express();
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var fileType    = require('file-type');
var auth = require('./auth');
var config = require('./config/config');

var clientUrl = config.clientUrl;
app.use(morgan('dev')); // use morgan to log requests to the console
app.use(express.static('./dist/digital'));

app.use( bodyParser.json({ limit: '50mb' }) ); // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ limit: '50mb', extended: true }) ); // to support URL-encoded bodies

// a catch all error handling function
app.use(function (err, req, res, next) {
	
	var code = err.hasOwnProperty('statusCode') ? err.statusCode : 500;
	var message = err.hasOwnProperty('message') ? err.message : 'An internal server error occured on the SAP DNN Server';
	var errorResponse = {
			error: {
			  errors: err,
			  code: code,
			  message: message
			}
	};
	res.send(errorResponse);
});

app.get('/', (req, res) => {
    console.log('path ', path);
    res.sendFile(path.join(__dirname, '/dist/digital/index.html'));
});

app.post("/upload", function(req, resultMain) {
    
  var data = req.body;
  console.log("QUERY STRING");
  console.log(req.query);
  var endpoint = req.query.url; // $_GET["id"]
  console.log("URL ENDPOINT");
  console.log(endpoint);
  /**
   * @function postClaimRequest
   * @description The postClaimRequest function is called from the auth module to pass the UAA Server Authentication methods.
   */
  auth.postClaimRequest(clientUrl+endpoint, data, function(err, statusCode, xuaa, result){
      console.log("NEW POST REQUEST CALLBACK:");
      console.log(xuaa);
      if(xuaa){
          auth.oAuthPost(xuaa, function(errors){
              if(errors.length === 0){
                  auth.postClaimRequest(clientUrl+endpoint, data, function(err2, statusCode2, xuaa2, result2){
                      console.log('---------------- POST CLAIM DONE WITH AUTH CODE HIT ----------------');
                      if (err2) {
                          console.log("ERROR: " + err2.message);
                          resultMain.send({ error : err2 });
                      } else {
                          console.log('---------------- LOGIN EXPIRES AT ----------------');
                          console.log(xuaa[1]);
                          console.log("RESULT: ");
                          console.log(result2);
                          console.log(typeof result2);
                          
                          if(result2){
                              if(isJSON(result2)){
                                  result2 = JSON.parse(result2);
                              }

                              if (typeof result2.code   !== 'undefined') {
                                  result2 = { error : 'A connection could not be made to the algorithm server.' }
                              }

                              createFile('output.json', JSON.stringify(result2));
                              // result2['display'] = config.display;
                          }
                          resultMain.send(result2);
                      }
                  });
              }else{
                  console.log('---------------- ERRORS OCCURRED IN AUTHENTICATION CODE ----------------');
                  console.log(errors);
                  resultMain.send(errors);
              }
          });
      }else{
          console.log('---------------- POST CLAIM DONE WITHOUT AUTH CODE HIT ----------------');
          if (err) {
              console.log("ERROR: " + err.message);
              resultMain.send({ error : err });
          } else {
              console.log("RESULT: ");
              console.log(result);
              console.log(typeof result);
              if(result){
                  if(isJSON(result)){
                      result = JSON.parse(result);
                  }
                  
                  if (result !== null && typeof result.code   !== 'undefined') {
                      result = { error : 'A connection could not be made to the algorithm server.' }
                  }
                  createFile('output.json', JSON.stringify(result));
                  // result['display'] = config.display;
              }
              resultMain.send(result);
          }
      }
  });
});

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var createFile = function(file, content) {
    
    fs.writeFile("tmp/"+file, content, function(err) {
        if(err) {
            return console.log(err);
        }else{
            console.log("The file was saved!");
        }
        
    }); 

}

// Start the app by listening on the default Heroku port 
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
  });