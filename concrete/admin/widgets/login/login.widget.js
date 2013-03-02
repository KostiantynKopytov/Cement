define(['module!admin'], function (module) {
    module.directive('ctLogin', [function() {
        return {
            replace: true,
            restrict: 'A',
            scope: {},
            controller: ['$scope', function (scope) {
                scope.visible = true;
            }],
            templateUrl: '/admin/widgets/login/login.widget.html'
        };
    }]);
});