define(function (require) {
    var api = require("libs/api"),
        FileM = require("models/file")

    return Backbone.Collection.extend({
        model: FileM,

        apiGet: function (id) {
            var that = this,
                url =  "files/" + (id ? id : "list");

            return api.get(url).then(function (response) {
                that.reset(JSON.parse(response.responseText).files);
                that.trigger("initialized");
            }, function (error) {
                console.error(error);
            });
        },

        initialize: function (data) {
           // this.apiGet();
        }
    });
});