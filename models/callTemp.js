var mongoose = require('mongoose'),
    SchemaNow = mongoose.Schema;
	
var tempModel = new SchemaNow({
	name: {type: String}
});

module.exports = mongoose.model('currentcalls', tempModel);