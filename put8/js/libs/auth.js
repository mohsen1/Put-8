define(function(){
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings,
        startURI = new Windows.Foundation.Uri("https://api.put.io/v2/oauth2/authenticate?client_id=177&response_type=code&redirect_uri=https://mohsenweb.com/putio"),
        endURI = new Windows.Foundation.Uri("http://mohsenweb.com/putio"),
        authURL = "https://api.put.io/v2/oauth2/access_token?client_id=177&client_secret=3zdkxj2i7f9w8ysofxh3&grant_type=authorization_code&redirect_uri=https://mohsenweb.com/putio&code=",
        authAsync = Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync,
        optionsNone = Windows.Security.Authentication.Web.WebAuthenticationOptions.none;

    var parseOAuthResult = function (result) {
        var response = result.responseData.split("mohsenweb.com/putio")[1],
            code;

        if (response && response.indexOf("code") > -1) {
            var code = response.split("code=")[1]
            roamingSettings.values["oAuthCode"] = code;
            console.info("oauthCode saved: ", code);
            return code;
        } else {
            return new WinJS.Promise.wrapError("Problem logging in");
        }
    };

    var setUserToken = function (result) {
        var userToken = JSON.parse(result.responseText).access_token;
        if (userToken) {
            roamingSettings.values["userToken"] = userToken;
            console.info("userToken saved: ", userToken);
            return WinJS.Promise.wrap(userToken);
        } else {
            return new WinJS.Promise.wrapError("Unable to reieve user token.");
        }
    };

    var getUserToken = function (code) {
        return WinJS.xhr({ url: authURL + code });
    };

    var handleError = function (error) {
        console.error(error.response);
        //TODO alert user with the error message
        return new WinJS.Promise.wrapError("prblem logging in");
    };

    return {
        signIn: function () {
            if (roamingSettings.values["oAuthCode"]) {
                return getUserToken(roamingSettings.values["oAuthCode"])
                .then(setUserToken, handleError);
            } else {
                return authAsync(optionsNone, startURI, endURI)
                   .then(parseOAuthResult, handleError)
                   .then(getUserToken, handleError)
                   .then(setUserToken, handleError);
            }
        },

        signOut: function () {
            return new WinJS.Promise.wrap("TODO");
        }
    }
});