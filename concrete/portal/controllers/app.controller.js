﻿define(['module!portal', 'jquery', 'extensions'], function(module, $, ext) {
    module.controller('AppController', ["$scope", "$location", "coreService", function($scope, $location, coreService) {
        $scope.$on("$locationChangeSuccess", function () {
            var path = $location.path();
            if (path === '/') {
                $location.path('/home');
            } else {
                coreService.getPage(path).success(function (data) {
                    $.extend($scope, data);
                }).error(function () {
                    // TODO: handle this
                });
            }

//            setTimeout(function () {
//                if (path === '/home') {
//                    $location.path('/vasya');
//                }
//                if (path === '/vasya') {
//                    $location.path('/home');
//                }
//                $scope.$apply();
//            }, 500);

            // cleanup css
            var links = $("style[data-usage='0']");
            links.remove();
        });

        $scope.$on('ctSave', function() {
            var json = angular.toJson(ext.cleanClone($scope));
            coreService.putPage($location.path(), json).error(function () {
                // TODO: handle this
            });
        });
    }]);
});