define(['module!admin', 'name!.'], function (module, widgetUrl) {
    module.directive('ctLogin', ['coreService', function(coreService) {
        return {
            replace: true,
            restrict: 'E',
            controller: function ($scope, $location, $element, $attrs) {
            },
            templateUrl: widgetUrl + '/login.widget.html'
        };
    }]);
});