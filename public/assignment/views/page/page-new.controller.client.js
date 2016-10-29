(function() {

    angular
        .module("WAMApp")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $scope, $location, PageService) {

        var vm = this;
        vm.newPage = newPage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.page = {};
        }
        init();

        function newPage() {
            if ($scope.newPageForm.$invalid) {
                $scope.newPageForm.$submitted = true;
                return;
            }

            PageService
                .createPage(vm.websiteId, vm.page)
                .then(
                    function(response) {
                        console.log("Reach");
                        vm.error = null;
                        vm.succcess = "New Page added!";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );
        }
    }

})();