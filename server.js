//Requirements
var express = require('express');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var log4js = require('log4js');

//Setup Logging
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/apilog.log'), 'apilog');
		
//Declarations
var db = mongoose.connect('mongodb://Woden:Brutus5hep@ds062807.mongolab.com:62807/calldata');		
var CallerLog = require('./models/callModel');
var app = express();
var port = process.env.PORT || 3000;
var callRouter = express.Router();
var logger = log4js.getLogger('apilog');

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
                    logger.error(err);
                }
            });
         });
    
         Promise.all(promises)
            .then(function() { 
                logger.info('Succesfully completed API call (/calls)'); 
                res.json(buildTimeString);
            })
            .error(function(err){logger.error(err)});
	});

app.use('/api', callRouter);

app.get('/', function(req, res){
	res.send('welcome to my API');
});

app.listen(port, function() { 
	console.log('Running Running on PORT: ' + port);
});
