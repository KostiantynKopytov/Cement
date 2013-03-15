define(['module!core', 'jquery', 'angular'], function(module, $, angular) {

    var getParentPlaceholderName = function(jqName) {
        var parent = jqName.parents('[ct-placeholder]');
        return (parent.length && getParentPlaceholderName(parent)) + (parent.length && (parent.attr('ct-placeholder') + ".")) || "";
    };

    module.directive('ctEditorPane', [function() {
        return {
            replace: true,
            restrict: 'A',
            scope: {},
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                require(['json!/core/widgets/*~name'], function(widgetTypes) {
                    $scope.widgetTypes = widgetTypes;
                });

                $scope.opened = true;
                $scope.$watch(function() {
                    var key = $('[ct-placeholder]').map(function(index, val) {
                        return $(val).data('$scope').$id;
                    }).get().join('|');
                    return key;
                }, function() {
                    $scope.placeholders = $('[ct-placeholder]').map(function(index, val) {
                        return {
                            name: (getParentPlaceholderName($(val)) + $(val).attr('ct-placeholder')).replace(/data\./g, ''),
                            scope: $(val).data('$scope')
                        };
                    }).get();
                });
                $scope.addWidget = function() {
                    $scope.placeholder.scope.widgets = $scope.placeholder.scope.widgets || [];
                    $scope.placeholder.scope.widgets.push({
                        type: $scope.widgetType
                    });
                };

                $scope.canAdd = function() {
                    return $scope.placeholder && $scope.widgetType;
                };

                $scope.save = function() {
                    $scope.$root.$broadcast('ctSave');
                };
            }],
            link: function(scope, element, attrs) {
                require(['jquery-ui'], function () {
                    var wrapper = $('.drag-wrap', element);
                    wrapper.sortable({
                        connectWith: '[ct-placeholder]',
                        tolerance: "pointer",
                        cursor: 'pointer',
                        cursorAt: { left: 0, top: -32 },
                        helper: function(event, item) {
                            return $('.widget-drag-helper', item).clone().show();
                        },
                        start: function(event, ui) {
                            ui.placeholder.attr('style', '').html(
                                $('.widget-drag-helper', ui.item).clone().show()
                            ).addClass('ct-placeholder-targetplace');
                        },
                        change: function(event, ui) {
                            ui.item.show();
                            var recevierElement = ui.placeholder.parent();
                            var receiverScope = recevierElement.data('$scope');
                            ui.placeholder.toggle(angular.isDefined(receiverScope));
                        },
                        stop: function(event, ui) {
                            var type = ui.item.data('widgetType');
                            var recevierElement = ui.item.parent();
                            var receiverScope = recevierElement.data('$scope');
                            if (angular.isDefined(receiverScope)) {
                                var receiverIndex = ui.item.index();

                                receiverScope.widgets = receiverScope.widgets || [];
                                receiverScope.widgets.splice(receiverIndex, 0, { type: type });
                                scope.$root.$apply();
                            }

                            wrapper.sortable("cancel");
                        }
                    }).disableSelection();
                });
            },
            templateUrl: '/core/widgets/editor-pane/editor-pane.widget.html'
        };
    }]);
});