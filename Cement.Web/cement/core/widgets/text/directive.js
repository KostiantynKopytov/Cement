define(['module!core'], function(module) {
    module.directive('text', function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                settings: '='
            },
            templateUrl: "/cement/core/widgets/text/template.html",
            link: function(scope, element, attrs) {
            }
        };
    });
});