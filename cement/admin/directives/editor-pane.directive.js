define(['module!admin', 'json!/portal/widgets/*~name'], function (module, widgets) {
    module.directive('editorPane', [function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                page: '='
            },
            controller: function($scope, $element, $attrs) {
                $scope.widgets = widgets;
                $scope.$watch('widget', function() {
                    if ($scope.widget) {
                        var url = String.Format("json!/portal/widgets/{0}/{0}*.html~name", $scope.widget);
                        require([url], function(templates) {
                            $scope.templates = templates;
                            if ($scope.template && (templates.indexOf($scope.template) >= 0)) {
                                $scope.template = null;
                            }
                            $scope.$apply();
                        });
                    } else {
                        $scope.templates = [];
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
            },
            templateUrl: '/admin/templates/editor-pane/editor-pane.template.html'
        };
    }]);
});