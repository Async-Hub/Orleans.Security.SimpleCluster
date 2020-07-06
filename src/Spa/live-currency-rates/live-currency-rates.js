(function(){
    const signalrHubName = 'currency-rates';
    let app = new Vue({
        el: '#app',
        data: {
            message: 'Status: Disconnected.',
            exchangeRates: null
        },
        methods: {
            connectionStart: function () {
                let connection = new signalR.HubConnectionBuilder()
                    .withUrl(azureSignalRConnectionNegotiationUrl + signalrHubName)
                    .build();

                connection.on("ReceiveNewRates", message => {
                    console.log(message);
                    let exchangeRates = JSON.parse(message);
                    this.refreshNewRates(exchangeRates);
                });

                connection.start()
                    .then(() => this.message = "Connected. Hub Name: CurrencyRates. Refresh interval: 5s.")
                    .catch(console.error);
            },
            refreshNewRates: function (exchangeRates) {
                this.exchangeRates = exchangeRates;
            }
        }
    });
    
    app.connectionStart();
})();