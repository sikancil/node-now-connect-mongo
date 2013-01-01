/*
 * Create HTTP Server instance
 */

var fs = require('fs'),
	http = require('http');
	
var server = http.createServer(function(req, res) {
	//fs.readFile('/var/www/index.html', function(err, data) {
		//res.writeHead(200, {'Content-Type': 'text/html'});
		//res.write(data);
		//res.end();
	//});
}).listen(8899);


/*
 * NowJS instance
 */

var everyone = require('now').initialize(server);

everyone.now.distributeMsg = function(msg) {
	console.log(msg);
	var currObj = new Object({ nama: this.now.name, pesan: msg });
	everyone.now.receiveMsg(currObj);
}