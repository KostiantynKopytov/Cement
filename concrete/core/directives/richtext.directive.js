define(['jquery', 'module!core', 'bootstrap-wysihtml5'], function ($, module) {
    module.directive('ctRichText', function () {
        return {
            restrict: 'AC',
            scope: {
                data: '=ngModel'
            },
            link: function (scope, element, attrs) {
                var wysihtml5;
                $(element).wysihtml5({
                    html: true,
                    color: true,
                    events: {
                        "change:composer": function () {
                            scope.data = wysihtml5.editor.getValue();
                            scope.$apply();
                        },
                        "load": function () {
                            wysihtml5 = $(element).data('wysihtml5');
                            scope.$watch('data', function (data) {
                                wysihtml5.editor.setValue(data);
                            });
                            scope.$apply();
                        }
                    }
                });
            }
        };
    });
});