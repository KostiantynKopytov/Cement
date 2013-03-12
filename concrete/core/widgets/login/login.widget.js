define(['module!core'], function (module) {
    module.directive('ctLogin', [function() {
        return {
            replace: true,
            restrict: 'A',
            scope: {},
            controller: ['$scope', function (scope) {
                scope.visible = true;
            }],
            templateUrl: '/core/widgets/login/login.widget.html'
        };
    }]);
});