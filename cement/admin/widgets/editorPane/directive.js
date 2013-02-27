define(['module!core'], function(module) {
    module.directive('editorPane', [function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                page: '='
            },
            controller: function($scope, $element, $attrs) {
                $scope.addModule = function (placeholder, settings) {
                    if (typeof $scope.page.widgets[placeholder] != 'undefined') {
                        $scope.page.widgets[placeholder].push({
                            directive: "text",
                            settings: settings
                        });
                    }
                };
            },
            templateUrl: "/admin/widgets/editorPane/template.html"
        };
    }]);
});