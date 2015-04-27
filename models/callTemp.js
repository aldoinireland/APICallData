var mongoose = require('mongoose'),
    SchemaNow = mongoose.Schema;
	
var tempModel = new SchemaNow({
	phonedns: {type: String},
	caller: {type: String},
	starttime: {type: Number},
	endtime: {type: Number},
	logdate: {type: Date},
	teamleader: {type: String},
	empnum: {type: String},
	site: {type: String},
	department: {type: String},
	queue: {type: String},
	calltime: {type: Number},
	minute: {type: Number}
});

module.exports = mongoose.model('currentcalls', tempModel);