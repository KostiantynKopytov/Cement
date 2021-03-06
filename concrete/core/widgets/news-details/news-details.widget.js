﻿define(['module!core', 'jquery'], function(module, $) {
    module.directive('ctNewsDetails', [function() {
        return {
            templateUrl: '/core/widgets/news-details/news-details.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctNewsDetails'
            },
            controller: ['$scope', '$location', 'dbService', function($scope, $location, dbService) {
                $scope.id = $scope.$root.page.params.id;
                if ($scope.id) {
                    dbService.getEntity('news', $scope.id).success(function(data) {
                        $scope.news = data;
                    });
                    $scope.$on('ctSave', function() {
                        dbService.putEntity('news', $scope.id, $scope.news);
                    });
                }
            }]
        };
    }]);
});