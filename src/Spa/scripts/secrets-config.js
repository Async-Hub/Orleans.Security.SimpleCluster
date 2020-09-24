azureSignalRConnectionNegotiationUrl = "http://localhost/api/";
//azureSignalRConnectionNegotiationUrl = "https://xxx.azurewebsites.net/api/";

var appConfig = {
    b2cScopes: ["https://xxx.onmicrosoft.com/SignalRTest/user_impersonation"]
};

var msalConfig = {
    auth: {
        clientId: "xxx-fec1-4519-xxx-f4ea636b3b32",
        authority: "https://login.microsoftonline.com/tfp/xxx.onmicrosoft.com/B2C_1_sign_up_sign_in"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};
