var connect = require('connect'),
	http = require('http');
	
/*	
	var app = connect()
		.use(connect.favicon())
		.use(connect.logger('dev'))
		.use(connect.static('public'))
		.use(connect.directory('public'))
		.use(connect.cookieParser())
		.use(connect.session({ secret: 'my secret here' }))
		.use(function(req, res){
			res.end('Hello from Connect!\n');
		});
	
	http.createServer(app).listen(3000);
*/

/*
	function sendJSON(response, obj) {
		response.writeHead(200, {'Content-Type':'application/json'});
		var objStr = JSON.stringify(obj);
		response.end(objStr);
	}
	
	function get(path, cb) {
		return function(req, res, next) {
			console.log(req.params.id);
			if (req.method != 'GET' || req.url != path) return next();
			cb(req, res, next);
		}
	}
	
	var app = connect()
		.use(connect.query())
		.use(get('/foo', function(req, res, next) {
			sendJSON(res, {path: 'foo'});
		}))
		.use(get('/bar', function(req, res, next) {
			sendJSON(res, {parth: 'bar'});
		}))
		.listen(3000);
*/

/*
	var app = connect();
	
	app.use(function(req, res){
		res.writeHead(200, {'Content-Type':'application/json'});
		res.end(JSON.stringify({ var: "abc", val: "123" }));
	});
	
	app.listen(5555);
*/


var connectRoute = require("connect-route");

connect(
	connect.static(__dirname + "/public"),
	connectRoute(function(app) {
		app.get("/sayHello/:firstName/:lastName", function(req, res) {
			var userName = req.params.firstName + " " + req.params.lastName;
			var html =	"<!doctype html>" +
						"<html><head><title>Hello " + userName + "</title></head>" +
						"<body><h1>Hello, " + userName + "!</h1></body></html>";
			res.end(html);
		});
		app.get("/public", function(req, res) {
			fs = require('fs');
			fs.readFile('public/index.html', function(err, data) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				res.end();
			});
		});
	})
).listen(8000);