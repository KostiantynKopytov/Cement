define(['module!admin', 'name!.', 'json!/portal/widgets/*~name'], function (module, widgetUrl, widgets) {
    module.directive('ctEditorPane', ['coreService', function(coreService) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                page: '='
            },
            controller: function($scope, $location, $element, $attrs) {
                $scope.widgets = widgets;
                $scope.addWidget = function() {
                    if (typeof $scope.page.placeholders[$scope.placeholder] != 'undefined') {
                        $scope.page.placeholders[$scope.placeholder].push({
                            name: $scope.widget,
                            settings: {},
                            container: { name: "default" }
                        });
                    }
                };
                $scope.save = function() {
                    coreService.putPage($location.path(), $scope.page).error(function() {
                        // TODO: handle this
                    });
                };

                $scope.canAdd = function () {
                    return $scope.page && $scope.page.placeholders[$scope.placeholder] && $scope.widget;
                };

            },
            templateUrl: widgetUrl + '/editor-pane.widget.html'
        };
    }]);
});