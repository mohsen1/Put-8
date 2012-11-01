define(function (require) {
    var Backbone = require("backbone"),
        FilesV = require("views/files");
   
    var Router = Backbone.Router.extend({
        routes: {
            "home": "home",
            "transfers": "transfers"
        },

        home: function () {
            var files = new FilesV();
        },

        transfers: function () {

        }
    });

    var router = new Router();

    Backbone.history.start();

    return router;
});