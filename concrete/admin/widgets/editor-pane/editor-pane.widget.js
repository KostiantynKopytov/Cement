define(['module!admin', 'jquery', 'name!.', 'json!/portal/widgets/*~name', 'angular'], function (module, $, widgetUrl, widgets, angular) {
    module.directive('ctEditorPane', ['coreService', function(coreService) {
        return {
            replace: true,
            restrict: 'A',
            scope: {
                page: '='
            },
            controller: ['$scope', '$element', '$attrs', '$location', function ($scope, $element, $attrs, $location) {
                $scope.$watch(function () {
                    var key = $('[ct-placeholder]').map(function(index, val) {
                        return $(val).data('$scope').$id
                    }).get().join('|');
                    return key;
                }, function () {
                    $scope.placeholders = $('[ct-placeholder]').map(function (index, val) {
                        return {
                            scope: $(val).data('$scope'),
                            name: $(val).attr('widgets')
                        };
                    }).get();
                });
                $scope.widgets = widgets;
                $scope.addWidget = function() {
                    $scope.placeholder.scope.widgets = $scope.placeholder.scope.widgets || [];
                    $scope.placeholder.scope.widgets.push({
                        name: $scope.widget,
                        settings: {},
                        container: { name: "default" }
                    });
                };
                $scope.save = function() {
                    var json = angular.toJson($scope.page);
                    console.log('saving', json);
                    coreService.putPage($location.path(), json).error(function () {
                        // TODO: handle this
                    });
                };

                $scope.canAdd = function () {
                    var placeholder = $scope.placeholder;
                    return $scope.page && placeholder && $scope.widget;
                };

            }],
            templateUrl: widgetUrl + '/editor-pane.widget.html'
        };
    }]);
});