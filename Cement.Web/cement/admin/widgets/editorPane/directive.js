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
                    if (typeof $scope.page.placeholders[placeholder] != 'undefined') {
                        $scope.page.placeholders[placeholder].push({
                                directive: "text",
                                settings: settings
                        });
                    }  
                };

                $scope.placehodlersList = Object.getOwnPropertyNames($scope.page.placeholders);
            },
            templateUrl: "/cement/admin/widgets/editorPane/template.html"
        };
    }]);
});