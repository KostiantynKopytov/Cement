define(['module!admin', 'name!.'], function (module, widgetUrl) {
    module.directive('ctLogin', [function() {
        return {
            replace: true,
            restrict: 'A',
            scope: {},
            controller: ['$scope', function (scope) {
                scope.visible = true;
            }],
            templateUrl: widgetUrl + '/login.widget.html'
        };
    }]);
});