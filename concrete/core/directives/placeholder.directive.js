define(['jquery', 'module!core', 'extensions'], function ($, module) {
    module.directive('ctPlaceholder', [function() {
        return {
            replace: true,
            template: '<ng-include src="getWidgetTemplateUrl(widget)" ng-repeat="widget in widgets"></ng-include>',
            restrict: 'E',
            scope: {
                widgets: '='
            },
            controller: function ($scope) {
                $scope.getWidgetTemplateUrl = function (widget) {
                    var template = widget.template || widget.name + ".widget";
                    var templateUrl = String.Format("/portal/widgets/{0}/{1}.html", widget.name, template);
                    return templateUrl;
                };
            }
        };
    }]);
});