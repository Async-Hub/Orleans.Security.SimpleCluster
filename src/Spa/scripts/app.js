const signalrHubName = 'message-dispatcher';
let connection = new signalR.HubConnectionBuilder()
    .withUrl(azureSignalRConnectionNegotiationUrl + signalrHubName)
    .build();

connection.on('ReceiveMessage', message => {
    console.log(message);
    htmlLog(message);
});

connection.start()
    .then(() => htmlLog('Connected to the Azure SignalR service.'))
    .catch(console.error);

let htmlLog = data => document.body.insertAdjacentHTML('beforeend', data + '</br>');