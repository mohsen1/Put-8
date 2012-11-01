define(function (require) {
    var api = require("libs/api"),
        ms = require("libs/ms"),
        Items = require("views/items"),
        FilesCollection = require("collections/files");

    // Sorts the groups
    function compareGroups(leftKey, rightKey) {
        return leftKey.charCodeAt(0) - rightKey.charCodeAt(0);
    }

    // Returns the group key that an item belongs to
    function getGroupKey(dataItem) {
        return dataItem.name.toUpperCase().charAt(0);
    }

    // Returns the title for a group
    function getGroupData(dataItem) {
        return {
            title: dataItem.name.toUpperCase().charAt(0)
        };
    }



    return Items.extend({
        initialize: function (options) {
            this.render()
                .then(this._initialize.bind(this))
                .then(this.setCollection.bind(this));
        },

        setCollection: function () {
            this.collection = new FilesCollection();
            this.collection.apiGet();
            this.collection.on("initialized", this.bindWinControl, this);
        },

        bindWinControl: function (directory) {
            var working = document.querySelector("#working");
            working.style.opacity = 1;

            var filesList = new WinJS.Binding.List(this.collection.toJSON()),
                groupedfilesList = filesList.createGrouped(getGroupKey, getGroupData, compareGroups);

            
            this.wc.itemDataSource = groupedfilesList.dataSource;
            this.wc.groupDataSource = groupedfilesList.groups.dataSource;

            working.style.opacity = 0;
        },

        render: function () {
            var that = this;
            return ms.render("html/files.html").then(function () {
                that.wc = document.querySelector("#items").winControl;
                that.wc.itemTemplate = document.querySelector("#fileTemplate");
                that.wc.groupTemplate = document.querySelector("#headerTemplate");
                return new WinJS.Promise.wrap();
            });;
        }
    });
});