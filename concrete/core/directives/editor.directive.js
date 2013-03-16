define(['jquery', 'module!core', 'extensions'], function ($, module, ext) {
    module.directive('ctEditor', ['$compile', function () {
        return {
            restrict: 'A',
            scope: {
                show: '=',
                data: '=',
                src: '@'
            },
            compile: function (tElement, tAttrs) {
                tElement.append($('<div ng-include />').attr('src', 'editor.src'));
                return function (scope, element) {
                    scope.$watch('show', function (show) {
                        if (show) {
                            scope.editor = {
                                data: ext.cleanClone(scope.data),
                                src: scope.src,
                                ok: function() {
                                    scope.data = ext.extend(scope.data, scope.editor.data);
                                    scope.show = false;
                                },
                                cancel: function() {
                                    scope.show = false;
                                }
                            };
                        } else {
                            delete scope.editor;
                        }
                    });
                };
            }
        };
    }]);
});