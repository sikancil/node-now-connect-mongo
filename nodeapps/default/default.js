var sys = require( "sys" ),
	http = require( "http" ),
	url = require( "url" ),
	path = require( "path" ),
	fileSystem = require( "fs" ),
	querystring = require( "querystring" );

var server = http.createServer(function(req, res) {
	/* console.log('Server start at 8899'); */
	
	/* Serving your static files */
	res.writeHead(200, { 'Content-Type': 'text/html'});
	
	var theUrl = req.url;
	var parsedUrl = querystring.parse(theUrl.substring(theUrl.lastIndexOf("/") + 1));
	console.log(parsedUrl);
	
	res.end('You are openning ' + parsedUrl.toString() + ' path.');
}).listen(8899);

/*
// Create a local memory space for further now-configuration.
(function(){
 
// Now that we have our HTTP server initialized, let's configure
// our NowJS connector.
var nowjs = require( "now" );
 
 
// After we have set up our HTTP server to serve up "Static"
// files, we pass it off to the NowJS connector to have it
// augment the server object. This will prepare it to serve up
// the NowJS client module (including the appropriate port
// number and server name) and basically wire everything together
// for us.
//
// Everyone contains an object called "now" (ie. everyone.now) -
// this allows variables and functions to be shared between the
// server and the client.
var everyone = nowjs.initialize( server );
 
 
// Create primary key to keep track of all the clients that
// connect. Each one will be assigned a unique ID.
var primaryKey = 0;
 
 
// When a client has connected, assign it a UUID. In the
// context of this callback, "this" refers to the specific client
// that is communicating with the server.
//
// NOTE: This "uuid" value is NOT synced to the client; however,
// when the client connects to the server, this UUID will be
// available in the calling context.
everyone.connected(
function(){
this.now.uuid = ++primaryKey;
}
);
 
 
// Add a broadcast function to *every* client that they can call
// when they want to sync the position of the draggable target.
// In the context of this callback, "this" refers to the
// specific client that is communicating with the server.
everyone.now.syncPosition = function( position ){
 
// Now that we have the new position, we want to broadcast
// this back to every client except the one that sent it in
// the first place! As such, we want to perform a server-side
// filtering of the clients. To do this, we will use a filter
// method which filters on the UUID we assigned at connection
// time.
everyone.now.filterUpdateBroadcast( this.now.uuid, position );
 
};
 
 
// We want the "update" messages to go to every client except
// the one that announced it (as it is taking care of that on
// its own site). As such, we need a way to filter our update
// broadcasts. By defining this filter method on the server, it
// allows us to cut down on some server-client communication.
everyone.now.filterUpdateBroadcast = function( masterUUID, position ){
 
// Make sure this client is NOT the same client as the one
// that sent the original position broadcast.
if (this.now.uuid == masterUUID){
 
// Return out of guard statement - we don't want to
// send an update message back to the sender.
return;
 
}
 
// If we've made it this far, then this client is a slave
// client, not a master client.
everyone.now.updatePosition( position );
 
};
 
})();
 
 
// ---------------------------------------------------------- //
// ---------------------------------------------------------- //
 
 
// Write debugging information to the console to indicate that
// the server has been configured and is up and running.
sys.puts( "Server is running on 8899" );
*/