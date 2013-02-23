defineModule({
    name: 'cement.core.directives',
    fileDeps: [
        'cement/core/directives/placeholder',
        'cement/core/directives/testmodule',
    ],
    callback: function (module) {
        for (var i = 1; i < arguments.length; i++) {
            var directive = arguments[i];
            module.directive(directive.name, directive.factory);
        }
    }
});
