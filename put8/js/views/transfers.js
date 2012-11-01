define(["libs/api"], function (api) {
    return {
        showTransfers: function (directory) {
            document.getElementById('working').style.opacity = 1;

            return api.get("transfers/list").then(function (response) {
                var result = JSON.parse(response.responseText);
                var transfersList = new WinJS.Binding.List(result.transfers);


                // Sorts the groups
                function compareGroups(leftKey, rightKey) {
                    return leftKey.charCodeAt(0) - rightKey.charCodeAt(0);
                }

                // Returns the group key that an item belongs to
                function getGroupKey(dataItem) {
                    return dataItem.status;
                }

                // Returns the title for a group
                function getGroupData(dataItem) {
                    return {
                        title: dataItem.status
                    };
                }

                // Create the groups for the ListView from the item data and the grouping functions
                var groupedTransfersList = transfersList.createGrouped(getGroupKey, getGroupData, compareGroups);


                items.winControl.itemTemplate = transferTemplate;
                items.winControl.itemDataSource = groupedTransfersList.dataSource;
                items.winControl.groupDataSource = groupedTransfersList.groups.dataSource;

                working.style.opacity = 0;

            }, function (error) {
                console.error("Loading transfers: ", error.statusText);
                return new WinJS.Promise.wrap();
            });
        }
    };
});