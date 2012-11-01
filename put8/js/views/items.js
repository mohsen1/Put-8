define(function () {
    var Items = Backbone.View.extend({
        _initialize: function () {
            this.el = items;
            this.listenToSnapped();
            return new WinJS.Promise.wrap();
        },

        listenToSnapped: function () {
            var lastViewState;
            window.addEventListener("resize", function (e) {
                var currentViewState = Windows.UI.ViewManagement.ApplicationView.value;
                var snapped = Windows.UI.ViewManagement.ApplicationViewState.snapped;

                if (currentViewState === snapped) {
                    items.winControl.layout = new WinJS.UI.ListLayout();
                }
                else if (lastViewState === snapped && currentViewState !== snapped) {
                    items.winControl.layout = new WinJS.UI.GridLayout();
                }

                lastViewState = currentViewState;
            });
        }
    });

    return Items;
});