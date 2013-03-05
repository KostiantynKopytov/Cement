define(['module!portal', 'jquery'], function(module, $) {
    module.directive('ctNewsDetails', [function() {
        return {
            templateUrl: '/portal/widgets/news-details/news-details.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctNewsDetails'
            },
            controller: ['$scope', '$location', 'dbService', function($scope, $location, dbService) {
                $scope.id = $location.search().id;
                if ($scope.id) {
                    dbService.getEntity('news', $scope.id).success(function(data) {
                        console.log('get news', $scope.id, data);
                        $scope.news = data;
                    });
                    $scope.$on('ctSave', function() {
                        console.log('put news', $scope.id, $scope.news);
                        dbService.putEntity('news', $scope.id, $scope.news);
                    });
                }
            }]
        };
    }]);
});