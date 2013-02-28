define(['module!admin', 'json!/portal/widgets/*~name'], function (module, widgets) {
    module.directive('editorPane', ['coreService', function(coreService) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                page: '='
            },
            controller: function($scope, $location, $element, $attrs) {
                $scope.widgets = widgets;
                $scope.$watch('widget', function() {
                    if ($scope.widget) {
                        var url = String.Format("json!/portal/widgets/{0}/{0}*.html~name", $scope.widget);
                        require([url], function(templates) {
                            $scope.templates = templates;
                            $scope.$apply();
                        });
                    }
                });
                $scope.addWidget = function() {
                    if (typeof $scope.page.placeholders[$scope.placeholder] != 'undefined') {
                        $scope.page.placeholders[$scope.placeholder].push({
                            name: $scope.widget,
                            template: $scope.template,
                            settings: {}
                        });
                    }
                };
                $scope.save = function() {
                    coreService.putPage($location.path(), $scope.page).error(function() {
                        // TODO: handle this
                    });
                };

                $scope.canAdd = function () {
                   
                    return $scope.page && $scope.templates && $scope.page.placeholders[$scope.placeholder] && $scope.widget && $scope.templates.indexOf($scope.template) >= 0;
                };

            },
            templateUrl: '/admin/templates/editor-pane/editor-pane.template.html'
        };
    }]);
});