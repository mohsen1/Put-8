define(function (require) {
    var ms = require("libs/ms"),
        UserBadge = require("views/user-badge");

    function renderUserBadge() {
        var userBadge = new UserBadge();
        userBadge.render();
    }
    return Backbone.View.extend({
        initialize: function(){
            this.render();
        },

        render: function () {
            return ms.render("html/topbar.html", document.querySelector("#topbar"))
                .then(renderUserBadge);
        }
    });
});