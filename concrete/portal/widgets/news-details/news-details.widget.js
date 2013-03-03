﻿define(['module!portal', 'jquery'], function(module, $) {
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
                    console.log('get news', id, data);
                    $scope.data = $scope.data || {};
                    $scope.data = $.extend($scope.data, { $news: $.extend($scope.data.$news || {}, data) });
                });
                $scope.$on('ctSave', function() {
                    console.log('put news', id, $scope.data.$news);
                    dbService.putEntity('news', id, $scope.data.$news);
                });
            }]
        };
    }]);
});