define(['module!core', 'extensions', 'jquery-ui'], function(module) {
    module.directive('ctDialog', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                title: "@",
                onClose: "&"
            },
            controller: ['$scope', '$element', '$attrs', function (scope, element, attrs) {
                scope.buttons = [];
                this.addButton = function (text, click) {
                    scope.buttons.push({
                        text: text,
                        click: function () {
                            scope.$apply(function() {
                                click();
                            });
                        }
                    });
                };

                $(element).dialog({
                    autoOpen: true,
                    modal: true,
                    close: function () {
                        scope.$apply(function () {
                            scope.onClose();
                        });
                    },
                    minWidth: 500,
                    minHeight: 300
                });

                scope.$watch('title', function () {
                    $(element).dialog('option', 'title', scope.title);
                });
                
                scope.$watch('buttons.length', function () {
                    $(element).dialog('option', 'buttons', scope.buttons);
                });

                scope.$on('$destroy', function () {
                    $(element).dialog('destroy');
                });
            }],
            template: "<div ng-transclude></div>"
        };
    });

    module.directive('ctDialogButton', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                onClick: '&'
            },
            require: '^ctDialog',
            link: function(scope, element, attrs, controller) {
                var content = element.contents();
                scope.$watch('onClick', function () {
                    var compiledContent = $compile(content)(scope);
                    controller.addButton(compiledContent.html(), scope.onClick);
                });
                $(element).remove();
            }
        };
    }]);
});