
// MARK: Variables
var express = require('express');
var app = express();
var apiai = require('apiai');
var apiAiApp = apiai("b944f4dfae0c4420980b542056e4c1b2");
var userName = ""
var userSive = "Siva"

// MARK:- Body
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

// Get Call
app.get('/', function (req, res) {
   res.send('Hello World');
})


// Post Call
app.post('/speak', function(req, res) {
    var userSays = req.body.userSays;
    userName = req.body.userName;
        
   var request = apiAiApp.textRequest(userSays, {
        sessionId: '123456789'
     });

   request.on('response', function(response) {
      var speech = response.result.fulfillment.speech
      if (speech === "Payload Content") {
        var result = {
            result: response.result.fulfillment.messages[1].payload[userName]
        } 
      } else {
        var pattern = /sir/ig;
        answer = speech.replace( pattern, userName );
        var result = {
            result: answer
        } 
    }
      res.send(result);
    });
    request.on('error', function(error) {
        console.log(error);
    });
   request.end();
});

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("App listening at http://%s:%s", host, port)
})
