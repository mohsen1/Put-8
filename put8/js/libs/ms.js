define(function () {
    return {
        render: function (path, element) {
            element = element || mainContent;
            element.innerHTML = "";

            return WinJS.UI.Fragments.renderCopy(path).then(
                function (renderedView) {
                    element.appendChild(renderedView);
                    return WinJS.UI.processAll(element);
                }
            );
        }
    }
});