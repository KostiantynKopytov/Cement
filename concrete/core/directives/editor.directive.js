define(['jquery', 'module!core', 'extensions'], function ($, module, ext) {
    module.directive('ctEditor', ['$compile', function () {
        return {
            restrict: 'A',
            scope: {
                data: '=',
                src: '='
            },
            compile: function (tElement, tAttrs) {
                tElement.append($('<div ng-include />').attr('src', 'src'));
                return function (scope, element) {
                    scope.$watch('src', function (src) {
                        if (src) {
                            scope.editor = {
                                data: ext.cleanClone(scope.data),
                                ok: function () {
                                    scope.data = ext.extend(scope.data, scope.editor.data);
                                    scope.src = null;
                                    delete scope.editor;
                                },
                                cancel: function () {
                                    scope.src = null;
                                    delete scope.editor;
                                }
                            };
                        }
                    });
                };
            }
        };
    }]);
});