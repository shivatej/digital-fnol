//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/digital'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/digital/index.html'));
});

// Start the app by listening on the default Heroku port 
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
  });