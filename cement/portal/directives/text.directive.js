define(['module!portal', 'extensions', 'json!./*.html~name'], function(module, extensions, templates) {
    module.directive('text', [function () {
        return {
            restrict: 'E',
        };
    }]);
});