define(['module!portal', 'extensions', 'json!./*.html~name'], function (module, extensions, templates) {
    extensions.registerWidget(module, 'text', templates, function (templateUrl) {
        return [function () {
            return {
                restrict: 'E',
                scope: {
                    settings: '='
                },
                templateUrl: templateUrl
            };
        }];
    });
});