define(['module!core', 'extensions', 'jquery-ui'], function(module) {
    module.directive('dialog', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                title: "@",
                close: "&"
            },
            controller: ['$scope', '$element', '$attrs', function (scope, element, attrs) {
                scope.buttons = [];
                this.addButton = function (text, click) {
                    scope.buttons.push({
                        text: text,
                        click: function() {
                            if (!click()) {
                                $(element).dialog('close');
                            }
                        }
                    });
                };

                $(element).dialog({
                    autoOpen: true,
                    modal: true,
                    close: function () {
                        $(element).dialog('destroy').remove();
                        scope.$apply('close()');
                    }
                });

                scope.$watch('title', function (title) {
                    $(element).dialog('option', 'title', title);
                });
                
                scope.$watch('buttons.length', function (buttons) {
                    $(element).dialog('option', 'buttons', scope.buttons);
                });
            }],
            template: "<div ng-transclude></div>"
        };
    });

    module.directive('dialogButton', function () {
        return {
            restrict: 'E',
            scope: {
                text: '@',
                click: '&'
            },
            require: '^dialog',
            link: function(scope, element, attrs, controller) {
                scope.$watch('click', function () {
                    controller.addButton(scope.text, function () { return scope.$apply('click()'); });
                });
            }
        };
    });
});