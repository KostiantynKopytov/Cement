define(['module!core'], function(module) {
    module.directive('ctPortlet', [function () {
        return {
            templateUrl: '/core/widgets/portlet/portlet.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctPortlet'
            }
        };
    }]);
});