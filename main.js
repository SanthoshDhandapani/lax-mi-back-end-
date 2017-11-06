var express = require('express');
var apiai = require('apiai');
var bodyParser = require('body-parser');


var app = express();
var apiAiApp = apiai("b944f4dfae0c4420980b542056e4c1b2");


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/speak', function(req, res) {
    var query = req.body.query;
    
    var request = apiAiApp.textRequest(query, {
        sessionId: '123456789'
     });

    request.on('response', function(response) {
        console.log(response);
        res.send(response);
    });
    request.on('error', function(error) {
        console.log(error);
    });

    request.end();
});

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("App listening at http://%s:%s", host, port)
})
