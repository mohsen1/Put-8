define(function (require) {
    var cachedIcons = [
        {remote: "https://put.io/images/file_types/folder.png", local: "images/icons/folder.png"}
    ];

    return Backbone.Model.extend({
        initialize: function (data) {
            this.setLocalIcons();

        },

        setLocalIcons: function () {
            var model = this;
            cachedIcons.forEach(function (item) {
                if (model.get("icon") === item.remote) {
                    model.set("icon", item.local);
                }
            });
        }
    });
});