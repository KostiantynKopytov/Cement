define(['jquery', 'module!core'], function($, module) {
    module.directive('ctContentEditable', [function() {
        return {
            restrict: 'A',
            scope: {
                data: '=ctContentEditable'
            },
            compile: function(tElement, tAttrs) {
                tElement.attr('contentEditable', 'true');

                return function (scope, element, attrs) {
                    scope.$parent.$watch('data', function(data) {
                        if ($(element).html() != data) {
                            $(element).html(data);
                        }
                    });

                    $(element).on('blur keyup paste', function () {
                        var $this = $(this);
                        if (scope.data !== $this.html()) {
                            $this.trigger('change');

                            scope.data = $this.html();
                            scope.$apply();
                        }
                        return $this;
                    });
                };
            }
        };
    }]);
});