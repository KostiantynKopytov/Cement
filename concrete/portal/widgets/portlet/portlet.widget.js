define(['module!portal'], function(module) {
    module.directive('ctPortlet', [function () {
        return {
            templateUrl: '/portal/widgets/portlet/portlet.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctPortlet'
            }
        };
    }]);
});