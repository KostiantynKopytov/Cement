define(['angular'], function (angular) {
    var module = angular.module('cement.core.directives.requireCss', []);
    module.directive('requireCss', function () {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                attrs.href = "css!" + attrs.href;
                require([attrs.href]);
            }
        };
    });
});
