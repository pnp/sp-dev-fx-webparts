// Port will be assigned automatically by the Azure Web App (rocess.env.port ). For localhost debugging, we use 8080.
// You can use the built-in Visual Studio Code debugger to test the solution locally.
var port = process.env.port || 8080;
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var azure = require('azure');

server.listen(port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Service Bus Connection string is retrieved from the app env app settings
var serviceBusService = azure.createServiceBusService(process.env.AZURE_SERVICEBUS_ACCESS_KEY);

// Listener function to pull the Azure service bus and see if new messages are available
setInterval(function() {

    serviceBusService.receiveQueueMessage('news', function(error, message){
        if(!error) {

            // Message received and deleted (default behavior of the service bus)
            console.log(message);

            // Broadcast to all connected clients
            io.emit('item:added', message );               
        }
    });

}, 5 );
