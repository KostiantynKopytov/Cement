define(['module!admin', 'jquery'], function (module, $) {

    var getParentPlaceholderName = function (jqName) {
        var parent = jqName.parents('[ct-placeholder]');
        return (parent.length && getParentPlaceholderName(parent)) + (parent.length && (parent.attr('ct-placeholder') + ".")) || "";
    };

    module.directive('ctEditorPane', [function() {
        return {
            replace: true,
            restrict: 'A',
            scope: {},
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                require(['json!/portal/widgets/*~name'], function(widgetTypes) {
                    $scope.widgetTypes = widgetTypes;
                });

                $scope.opened = true;
                $scope.$watch(function () {
                    var key = $('[ct-placeholder]').map(function(index, val) {
                        return $(val).data('$scope').$id;
                    }).get().join('|');
                    return key;
                }, function () {
                    $scope.placeholders = $('[ct-placeholder]').map(function (index, val) {
                        return {
                            name: (getParentPlaceholderName($(val)) + $(val).attr('ct-placeholder')).replace(/data\./g, ''),
                            scope: $(val).data('$scope')
                        };
                    }).get();
                });
                $scope.addWidget = function () {
                    $scope.placeholder.scope.widgets = $scope.placeholder.scope.widgets || [];
                    $scope.placeholder.scope.widgets.push({
                        type: $scope.widgetType
                    });
                };

                $scope.canAdd = function () {
                    return $scope.placeholder && $scope.widgetType;
                };
                
                $scope.save = function () {
                    $scope.$root.$broadcast('ctSave');
                };
            }],
            templateUrl: '/admin/widgets/editor-pane/editor-pane.widget.html'
        };
    }]);
});