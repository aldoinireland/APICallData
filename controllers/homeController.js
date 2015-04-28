(function (homeController) {
    homeController.init = function(app) {
        app.get('/', function(req, res){
        	res.render("index.html", { title: "Charting Realtime Data Prototype" });
        });
    };
})(module.exports);

