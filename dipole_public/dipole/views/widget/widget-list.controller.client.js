(function() {
    angular
       .module("WAMApp")
       .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;
        vm.sort = sort;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function(response) {
                        vm.widgets = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
        init();

        function getTrustedUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }

        function sort(start, end) {
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(
                    function(response) {
                        // DO NOTHING
                        vm.error = null;
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );
        }

        // $(".sortable-widgets").sortable();
    }
})();