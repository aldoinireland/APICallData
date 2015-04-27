
var mongoose = require('mongoose');
mongoose.connect('mongodb://Woden:Brutus5hep@ds062807.mongolab.com:62807/calldata');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  var kittySchema = mongoose.Schema({
    name: String
})

var Kitten = mongoose.model('calltemp', kittySchema)

Kitten.count(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens)
})


});

