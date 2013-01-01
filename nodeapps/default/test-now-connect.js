var http = require('http'),
	connect = require('connect'),
	connectRoute = require("connect-route"),
	nowjs = require('now');
	
var MongoStore = require('connect-mongo')(connect);

var app = connect();
	/* unused! replaced by connectRoute as URL path router
	app.use(function(req, res) {
		//connect.static(__dirname + "/public");
	})
	*/
	
	app.use(connectRoute(function(router) {
			router.get("/sayHello/:firstName/:lastName", function(_req, _res, _next) {
				var userName = _req.params.firstName + " " + _req.params.lastName;
				var html =	"<!doctype html>" +
							"<html><head><title>Hello " + userName + "</title></head>" +
							"<body><h1>Hello, " + userName + "!</h1></body></html>";
				_res.end(html);
			});
			router.get("/public", function(_req, _res, _next) {
				fs = require('fs');
				fs.readFile('public/index.html', function(err, data) {
					_res.writeHead(200, {'Content-Type': 'text/html'});
					_res.write(data);
					_res.end();
				});
			});
		})
	);

var server = http.createServer(app).listen(8899);
var everyone = nowjs.initialize(server);

//var everyone = require('now').initialize(server);
everyone.now.distributeMsg = function(msg) {
	console.log(msg);
	var currObj = new Object({ nama: this.now.name, pesan: msg });
	everyone.now.receiveMsg(currObj);
}