define(['module!core', 'extensions', 'json!./*.html~name'], function (module, extensions, templates) {
    extensions.registerDirectives(module, 'text', templates, function (templateUrl) {
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