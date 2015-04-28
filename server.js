//Requirements
var express = require('express');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
		
//Declarations
var db = mongoose.connect('mongodb://xxxxx:xxxxxx@ds062807.mongolab.com:62807/calldata');		
var CallerLog = require('./models/callModel');
var TempLog = require('./models/callTemp');
var app = express();
var ejsEngine = require("ejs-locals");
var port = process.env.PORT || 3000;
var callRouter = express.Router();
var controllers = require("./controllers");

//View Engine
app.engine("html", ejsEngine);
app.set("view engine", "ejs");

//Controllers
controllers.init(app);

//Set Static Routes
app.use(express.static(__dirname + "/public"));


//Routes
callRouter.route('/calls')
	.get(function(req, res){
		
		var query = {};
		
         if(req.query.minute)	{
			 query.minute = req.query.minute;
		 }	
		 
		 var buildTimeString = [];
		 var currentDate = new Date();
		 var timeFromHour = currentDate.getMinutes();
		 
		 for (var i = timeFromHour + 1; i < 60; i++) { 
           buildTimeString.push({minute:i ,calls:0});
         }
         
 		 for (var i = 0; i <= timeFromHour; i++) { 
           buildTimeString.push({minute:i ,calls:0});
         }
         
         var promises = buildTimeString.map(function(data) {
            query.minute = data.minute;
            return CallerLog.count(query, function(err, calls){
                if(!err){
                    data.calls = calls;
                } else {
                    console.log(err);
                }
            });
         });
    
         Promise.all(promises)
            .then(function() { 
                res.json(buildTimeString);
            })
            .error(console.error);
	});
	
callRouter.route('/now')
    .get(function(req, res){
        TempLog.count(function(err, calls){
            var obj = [];
            obj.push({current : calls });
            if(!err){
                res.json(obj);
            } else {
                console.log(err);
            }
        });
    });
    
callRouter.route('/aht')
    .get(function(req, res){
        
		 var buildTimeString = [];
		 var currentDate = new Date();
		 var timeFromHour = currentDate.getMinutes();
		 
		 for (var i = timeFromHour + 1; i < 60; i++) { 
           buildTimeString.push({minute:i ,totalseconds:0});
         }
         
 		 for (var i = 0; i <= timeFromHour; i++) { 
           buildTimeString.push({minute:i ,totalseconds:0});
         }
         
         var promises = buildTimeString.map(function(data) {
            return CallerLog.aggregate(
                  [
                    { $match: {
                        minute: data.minute
                    }},
                    {
                    $group : {
                       _id : null,
                       totalseconds: { $sum: "$calltime" }
                    }
                    }
                ], function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    
                    data.totalseconds = result[0].totalseconds;
                }
            );
         });
    
         Promise.all(promises)
            .then(function() { 
                res.json(buildTimeString);
            })
            .error(console.error);
         
    });
    
callRouter.route('/avg')
    .get(function(req, res){
        
		 var buildTimeString = [];
		 var currentDate = new Date();
		 var timeFromHour = currentDate.getMinutes();
		 
		 for (var i = timeFromHour + 1; i < 60; i++) { 
           buildTimeString.push({minute:i ,avgseconds:0});
         }
         
 		 for (var i = 0; i <= timeFromHour; i++) { 
           buildTimeString.push({minute:i ,avgseconds:0});
         }
         
         var promises = buildTimeString.map(function(data) {
            return CallerLog.aggregate(
                  [
                    { $match: {
                        minute: data.minute
                    }},
                    {
                    $group : {
                       _id : null,
                       totalseconds: { $avg: "$calltime" }
                    }
                    }
                ], function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    
                    data.avgseconds = parseInt((result[0].totalseconds).toFixed(0));
                }
            );
         });
    
         Promise.all(promises)
            .then(function() { 
                res.json(buildTimeString);
            })
            .error(console.error);
         
    });

app.use('/api', callRouter);

app.listen(port, function() { 
	console.log('Running Running on PORT: ' + port);
});
