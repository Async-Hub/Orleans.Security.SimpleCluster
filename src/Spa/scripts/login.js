(function(){
    "use strict";
    
    var loginApp = {};
    document.loginApp = loginApp;
    
    let clientApplication = new Msal.UserAgentApplication(msalConfig);

    loginApp.login = function login() {

        var loginRequest = {
            scopes: appConfig.b2cScopes
        };

        clientApplication.loginPopup(loginRequest).then(function (loginResponse) {
            var tokenRequest = {
                scopes: appConfig.b2cScopes
            };

            clientApplication.acquireTokenSilent(tokenRequest).then(function (tokenResponse) {
                updateUI();
            }).catch(function (error) {
                clientApplication.acquireTokenPopup(tokenRequest).then(function (tokenResponse) {
                    updateUI();
                }).catch(function (error) {
                    logMessage("Error acquiring the popup:\n" + error);
                });
            })
        }).catch(function (error) {
            logMessage("Error during login:\n" + error);
        });
    };

    function updateUI() {
        var userName = clientApplication.getAccount().name;
        console.log(clientApplication.getAccount());
        logMessage("User '" + userName + "' logged-in");
        
        var authButton = document.getElementById('auth');
        authButton.innerHTML = 'logout';
        authButton.setAttribute('onclick', 'loginApp.logout();');
        
        var label = document.getElementById('label');
        label.innerText = "Hello " + userName;
    }
    
    loginApp.logout = function logout() {
        // Removes all sessions, need to call AAD endpoint to do full logout
        clientApplication.logout();
    };

    function logMessage(s) {
        document.body.querySelector('.response').appendChild(document.createTextNode('\n' + s));
    }
})();