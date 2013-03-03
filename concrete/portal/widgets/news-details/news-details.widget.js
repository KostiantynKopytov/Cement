define(['module!portal'], function(module) {
    module.directive('ctNewsDetails', [function() {
        return {
            templateUrl: '/portal/widgets/news-details/news-details.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctNewsDetails'
            },
            controller: ['$scope', '$location', 'dbService', function ($scope, $location, dbService) {
                var id = $location.search().id;
                dbService.getEntity('news', id).success(function (data) {
                    $scope.news = data;
                });
                $scope.$on('ctSave', function() {
                    dbService.putEntity('news', id, $scope.news);
                });
            }]
        };
    }]);
});