define(['module!portal', 'jquery', 'name!.'], function(module, $, widgetUrl) {
    module.directive('ctMainLayout', [function() {
        return {
            templateUrl: widgetUrl + '/main-layout.widget.html',
            replace: true,
            restrict: 'E',
            scope: {
                settings: '='
            },
            controller: ['$scope', function(scope) {
//                scope.settings = {
//                    top: [],
//                    left: [],
//                    content: [],
//                };
            }]
        };
    }]);
});