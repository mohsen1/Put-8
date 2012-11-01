define(function () {
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    return {
        get: function (url) {
            return WinJS.xhr({
                url: "https://api.put.io/v2/" + url + "?oauth_token=" + roamingSettings.values["userToken"]
            });
        },

        post: function (url, data) {
            return WinJS.xhr({
                url: "https://api.put.io/v2/" + url + "?oauth_toke=" + roamingSettings.values["userToken"],
                data: data
            });
        }
    };
});