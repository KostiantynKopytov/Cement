define(['../../module', 'json!/portal/widgets/*~name', 'extensions'], function (module, widgets) {
    module.directive('editorPane', [function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                page: '='
            },
            controller: function ($scope, $element, $attrs) {
                $scope.widgets = widgets;
                $scope.$watch('widget', function () {
                    if ($scope.widget) {
                        var url = String.Format("json!/portal/widgets/{0}/*.html~name", $scope.widget);
                        require([url], function(templates) {
                            $scope.templates = templates;
                            if ($scope.template && !templates.contains($scope.template)) {
                                $scope.template = null;
                            }
                            $scope.$apply();
                        });
                    } else {
                        $scope.templates = [];
                    }
                });
                $scope.addWidget = function (placeholder, widget, settings) {
                    if (typeof $scope.page.placeholders[placeholder] != 'undefined') {
                        $scope.page.placeholders[placeholder].push({
                            directive: widget,
                            settings: settings
                        });
                    }
                };
            },
            templateUrl: "/admin/widgets/editorPane/template.html"
        };
    }]);
});