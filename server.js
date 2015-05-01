//Requirements
var express = require('express');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var schedule = require("node-schedule");
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
		
//Declarations
var dbData;
var stats;
var db = mongoose.connect('mongodb://xxxxx:xxxxxxxx@ds062807.mongolab.com:62807/calldata');		
var CallerLog = require('./models/callModel');
var TempLog = require('./models/callTemp');
var app = express();
var ejsEngine = require("ejs-locals");
var port = process.env.PORT || 3000;
var callRouter = express.Router();
var controllers = require("./controllers");
var siteList = [];
var fieldList = [];
var buildTimeString = [];

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
        query.fields = [];
            
        
        siteList.forEach(function(data){
            query.fields.push(data);
        });
        
        
		stats.find({}, query).toArray(function(err, data) {
		    if(!err)
    		{
    		    res.status(200).json(data);
    		    console.log("Response to /calls");
		    }
		    else
		        console.log(err);
		});
	});
	
	
	
callRouter.route('/sum')
	.get(function(req, res){
		
		var query = {};
        query.fields = [];
            
        
        siteList.forEach(function(data){
            query.fields.push(data + "Sum");
        });
        
        
		stats.find({}, query).toArray(function(err, data) {
		    if(!err)
    		{
    		    res.status(200).json(data);
    		    console.log("Response to /sum");
		    }
		    else
		        console.log(err);
		});
	});
	
callRouter.route('/avg')
	.get(function(req, res){
		var query = {};
        query.fields = [];
            
        
        siteList.forEach(function(data){
            query.fields.push(data + "Avg");
        });
        
        
		stats.find({}, query).toArray(function(err, data) {
		    if(!err)
    		{
    		    res.status(200).json(data);
    		    console.log("Response to /Avg");
		    }
		    else
		        console.log(err);
		});
	});
	
callRouter.route('/now')
    .get(function(req, res){
        var site = req.param('site');
        TempLog.find({site: site}).count(function(err, calls){
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
    MongoClient.connect("mongodb://xxxxxx:xxxxxxx@ds062807.mongolab.com:62807/calldata", function(err, db) { //Mongo Client for unsctructured data
        console.log("Connected to Mongo");
        dbData = db;
        stats = dbData.collection("callstats");
        BuildTimeString();
    });
    
	console.log('Running Running on PORT: ' + port);
	
	var rule = new schedule.RecurrenceRule();

    rule.minute = new schedule.Range(0, 59, 1);
    
    schedule.scheduleJob(rule, function(){
        shiftTimeString(new Date().getMinutes());
    });
    
});

//Building and updating data model
function BuildTimeString()
	{
	    buildTimeString = [];
	    var item = {};
	    var query = {};
        var currentDate = new Date();
    	var timeFromHour = currentDate.getMinutes();
        console.log("Building time string ....");
            for (var i = timeFromHour + 1; i < 60; i++) { 
    		     item = {};
    		     item.minute = "" + i;
    		     siteList.forEach(function(site) {
    		        Object.defineProperty(item, site, {
    		            value: 0,
    		            enumerable: true,
    		            writable: true
    		        });
    		     });
                
                 buildTimeString.push(item);
             }
             
     		 for (var i = 0; i <= timeFromHour; i++) { 
     		    item = {};
    		     item.minute = "" + i;
    		     siteList.forEach(function(site) {
    		        Object.defineProperty(item, site, {
    		            value: 0,
    		            enumerable: true,
    		            writable: true
    		        });
    		     });
                
                 buildTimeString.push(item);
             }
        stats.remove();     
             
        buildTimeString.map(function(data) {
            query.minute = data.minute;
            return CallerLog.find(query, function(err, calls){
                if(!err){
                    
                    calls.filter(function(calls) { 
                        if(!isNaN(eval("data." + calls._doc.site)))
                        {
                            eval("data." + calls._doc.site + "++");
                            eval("data." + calls._doc.site + "Sum += calls._doc.calltime");
                        }
                        else
                        {
                            eval("data." + calls._doc.site + "= 1");
                            eval("data." + calls._doc.site + "Sum = calls._doc.calltime");
                            eval("data." + calls._doc.site + "Avg = 0");
                            if(!siteExists(calls._doc.site))
                                siteList.push(calls._doc.site);
                        }
                    });
                    
                    siteList.forEach(function(site) {
	                    eval("data."+ site +"Avg = parseInt((data." + site + "Sum / data." + site + "),10)");
	                 });
                    
                    stats.insert(data);
                    console.log("Inserted Minute " + data.minute);
                } else {
                    console.log(err);
                }
            })
         });
             
        
	}
	
	function shiftTimeString(currentMinute)
	{
	    console.log("Shifting");
	    var query = {};
	    buildTimeString.shift();
	    query.minute = currentMinute;
	    var item = {minute : "" + currentMinute};
	    
	    CallerLog.find(query, function(err, calls) {
	        if(!err)
	        {
	            calls.filter(function(calls) {
	                if(!isNaN(eval("item." + calls._doc.site)))
                        {
                            eval("item." + calls._doc.site + "++");
                            eval("item." + calls._doc.site + "Sum += calls._doc.calltime");
                        }
                        else
                        {
                            eval("item." + calls._doc.site + "= 1");
                            eval("item." + calls._doc.site + "Sum = calls._doc.calltime");
                        }
	            });
	            
	            siteList.forEach(function(site) {
	                eval("item."+ site +"Avg = parseInt((item." + site + "Sum / item." + site + "),10)");
	            });
	        }
	        else
	        {
	            console.log(err);
	        }
	    }).exec().then(function() {
	                stats.remove({minute : item.minute}, function() { stats.insert(item); });
	            });
	}
	
	function siteExists(site)
	{
	    var exists = false;
	    siteList.forEach(function(data) {
	        if(site == data)
	            exists = true;
	    });
	    
	    return exists;
	}
