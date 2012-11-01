define(function (require) {
    var ms = require("libs/ms");
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    return Backbone.View.extend({
        //TODO add a model for user
        render: function () {
            ms.render("html/user-badge.html", document.querySelector("#userInfo"))
                .then(function () {
                    return WinJS.xhr({
                        url: "https://api.put.io/v2/account/info?oauth_token=" + roamingSettings.values["userToken"]
                    });
                }).then(function (result) {
                    var template = document.querySelector("#userInfoTemplate").winControl;
                    var user = JSON.parse(result.responseText);
                    var UserInfoObject = new WinJS.Binding.define({
                        username: user.info.username,
                        percent: Math.floor(user.info.disk.used / user.info.disk.size * 100),
                        gigabyteSize: user.info.disk.size / Math.pow(1024, 3)
                    });

                    template.render(new UserInfoObject, document.querySelector("#userInfo"));
                });
        }
    });
});