define(['module!core', 'extensions'], function(module) {
    module.directive('ctDialog', function() {
        return {
            replace: true,
            transclude: true,
            scope: {
                title: "@",
                onClose: "&"
            },
            controller: ['$scope', '$element', '$attrs', function (scope, element, attrs) {
                scope.buttons = [];
                this.addButton = function (text, click) {
                    console.log('addButton received');
                    scope.buttons.push({
                        text: text,
                        click: function () {
                            scope.$apply(function() {
                                click();
                            });
                        }
                    });
                };

                require(['jquery-ui'], function() {
                    $(element).dialog({
                        autoOpen: true,
                        modal: false,
                        close: function() {
                            scope.$apply(function() {
                                scope.onClose();
                            });
                        },
                        minWidth: 500,
                        minHeight: 300
                    });

                    scope.$watch('title', function() {
                        $(element).dialog('option', 'title', scope.title);
                    });

                    scope.$watch('buttons.length', function() {
                        console.log('buttons', scope.buttons);
                        $(element).dialog('option', 'buttons', scope.buttons);
                    });

                    scope.$on('$destroy', function() {
                        $(element).dialog('destroy');
                    });

                    scope.$apply();
                });
            }],
            template: "<div ng-transclude></div>"
        };
    });

    module.directive('ctDialogButton', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            scope: {
                onClick: '&'
            },
            require: '^ctDialog',
            link: function(scope, element, attrs, controller) {
                var content = element.contents();
                scope.$watch('onClick', function () {
                    var compiledContent = $compile(content)(scope);
                    controller.addButton(compiledContent.html(), scope.onClick);
                    console.log('addButton sent');
                });
                $(element).hide();
            }
        };
    }]);
});