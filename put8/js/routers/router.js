define(function (require) {
    var FilesV = require("views/files"),
        TopBarV = require("views/topbar");
        
   
    var Router = Backbone.Router.extend({
        routes: {
            "files/:id": "files",
            "transfers": "transfers"
        },

        files: function (id) {
            var filesV = new FilesV({
                directoryId: id
            });
        },

        transfers: function () {

        }
    });

    var router = new Router();
    router.on("all", function (route) {
        var topBarv = new TopBarV();
    });

    

    Backbone.history.start();

    return router;
});