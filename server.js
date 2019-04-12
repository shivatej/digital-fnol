//Install express server
const express = require('express');
const path = require('path');

const app = express();

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/digital'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/digital/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });