require.config({
    baseUrl: "/js"
});

define(function (require) {
    "use strict";

    // Modules
    var Auth = require("libs/auth"),
        router = require("routers/router");

    WinJS.Binding.optimizeBindingReferences = true;
    var app = WinJS.Application;
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    app.onactivated = function (args) {
        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {
            // TDOD check for internet connection first
            //
            Auth.signIn()
                .then(function () {
                    router.navigate("files/0", { trigger: true });
                }, function (error) {
                    console.error("Error logging in: ", error);
                });

            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.start();
});