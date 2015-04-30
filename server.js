//Requirements
var express = require('express');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
		
//Declarations
var db = mongoose.connect('mongodb://Woden:Brutus5hep@ds062807.mongolab.com:62807/calldata');		
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

//Mathematics
var sumArray = function(array){
    var sum = 0;
    for( var i = 0; i < array.length; i++ ){
    sum += parseInt( array._doc.calltime, 10 ); //don't forget to add the base
    }
    return sum;
}

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
           buildTimeString.push({minute:i ,wtfd:0 ,wex:0, cvn:0});
         }
         
 		 for (var i = 0; i <= timeFromHour; i++) { 
            buildTimeString.push({minute:i ,wtfd:0 ,wex:0, cvn:0});
         }
         
         var promises = buildTimeString.map(function(data) {
            query.minute = data.minute;
            return CallerLog.find(query, function(err, calls){
                if(!err){
                    
                    calls.filter(function(calls) { 
                        switch(calls._doc.site){
                            case "Waterford" :
                                data.wtfd += 1;
                                break;
                            case "Wexford" :
                                data.wex +=1;
                                break;
                            case "Craigavon" :
                                data.cvn +=1;
                                break;
                        }
                    });
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
	
callRouter.route('/sum')
	.get(function(req, res){
		
		var query = {};
		
         if(req.query.minute)	{
			 query.endMinute = req.query.minute;
		 }	
		 
		 var buildTimeString = [];
		 var currentDate = new Date();
		 var timeFromHour = currentDate.getMinutes();
		 
		 for (var i = timeFromHour + 1; i < 60; i++) { 
           buildTimeString.push({minute:i ,wtfrdsum : 0, wexsum: 0, cvnsum : 0});
         }
         
 		 for (var i = 0; i <= timeFromHour; i++) { 
            buildTimeString.push({minute:i ,wtfrdsum : 0, wexsum: 0, cvnsum : 0});
         }
         
         var promises = buildTimeString.map(function(data) {
            query.endMinute = data.minute;
            return CallerLog.find(query, function(err, calls){
                if(!err){
                    
                    calls.filter(function(calls) { 
                        switch(calls._doc.site){
                            case "Waterford" :
                                data.wtfrdsum += calls._doc.calltime;
                                break;
                            case "Wexford" :
                                data.wexsum += calls._doc.calltime;
                                break;
                            case "Craigavon" :
                                data.cvnsum += calls._doc.calltime;
                                break;
                        }
                    });
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
	
callRouter.route('/avg')
	.get(function(req, res){
		
		var countwtfrd = 0, countwex = 0, countcvn = 0;
		var sumwtfrd = 0, sumwex = 0, sumcvn = 0;
		var query = {};
		
         if(req.query.minute)	{
			 query.endMinute = req.query.minute;
		 }	
		 
		 var buildTimeString = [];
		 var currentDate = new Date();
		 var timeFromHour = currentDate.getMinutes();
		 
		 for (var i = timeFromHour + 1; i < 60; i++) { 
           buildTimeString.push({minute:i ,wtfrdavg : 0, wexavg : 0, cvnavg : 0});
         }
         
 		 for (var i = 0; i <= timeFromHour; i++) { 
            buildTimeString.push({minute:i ,wtfrdavg : 0, wexavg : 0, cvnavg : 0});
         }
         
         var promises = buildTimeString.map(function(data) {
            query.endMinute = data.minute;
            return CallerLog.find(query, function(err, calls){
                if(!err){
                    
                    calls.filter(function(calls) { 
                        switch(calls._doc.site){
                            case "Waterford" :
                                countwtfrd += 1;
                                sumwtfrd += calls._doc.calltime;
                                data.wtfrdavg = parseInt((sumwtfrd / countwtfrd),10);
                                break;
                            case "Wexford" :
                                countwex +=1;
                                sumwex += calls._doc.calltime;
                                data.wexavg = parseInt((sumwex / countwex),10);
                                break;
                            case "Craigavon" :
                                countcvn +=1;
                                sumcvn += calls._doc.calltime;
                                data.cvnavg = parseInt((sumcvn / countcvn),10);
                                break;
                        }
                    });
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
    
callRouter.route('/nowwtfrd')
    .get(function(req, res){
        var query = {};
        query.site = 'Waterford';
        TempLog.count(query, function(err, calls){
            var obj = [];
            obj.push({current : calls });
            if(!err){
                res.json(obj);
            } else {
                console.log(err);
            }
        });
    });
    
callRouter.route('/nowwex')
    .get(function(req, res){
        var query = {};
        query.site = 'Wexford';
        TempLog.count(query, function(err, calls){
            var obj = [];
            obj.push({current : calls });
            if(!err){
                res.json(obj);
            } else {
                console.log(err);
            }
        });
    });
    
callRouter.route('/nowcvn')
    .get(function(req, res){
        var query = {};
        query.site = 'Craigavon';
        TempLog.count(query, function(err, calls){
            var obj = [];
            obj.push({current : calls });
            if(!err){
                res.json(obj);
            } else {
                console.log(err);
            }
        });
    });
    
app.use('/api', callRouter);

app.listen(port, function() { 
	console.log('Running Running on PORT: ' + port);
});
