define(['module!core'], function(module) {
    module.directive('editorPane', [function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                page: '='
            },
            controller: function($scope, $element, $attrs) {
                $scope.placeholder = "";
                $scope.widgetTitle = "";
                $scope.widgetContent = "";
                $scope.addModule = function () {
                    if (typeof $scope.page.placeholders[$scope.placeholder] != 'undefined') {
                        $scope.page.placeholders[$scope.placeholder].push({
                                directive: "text",
                                settings: { title: $scope.widgetTitle, content: $scope.widgetContent }
                        });
                    }  
                };

                $scope.placehodlersList = Object.getOwnPropertyNames($scope.page.placeholders);
            },
            templateUrl: "/cement/core/widgets/editorPane/template.html"
        };
    }]);
});