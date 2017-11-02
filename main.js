var express = require('express');
var apiai = require('apiai');

var app = express();
// var mongo = require('mongodb');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/sand";


app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/speak', function (req, res) {
   
    
    var apiAiApp = apiai("b944f4dfae0c4420980b542056e4c1b2");
    
    var request = apiAiApp.textRequest("alarm", {
        sessionId: '123456789'
      });
    request.on('response', function(response) {
        console.log(response);
        // MongoClient.connect(url, function(err, db) {
        //     if (err) throw err;
        //     db.collection("cars").findOne({}, function(err, result) {
        //       if (err) throw err;
        //       res.send(JSON.stringify(response)+"<br/><br/> car name :"+result.carName);                  
        //       db.close();
        //     });
        //   });
        res.send(response);
    });
    request.on('error', function(error) {
        console.log(error);
    });
    request.end();
 })

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("App listening at http://%s:%s", host, port)
})