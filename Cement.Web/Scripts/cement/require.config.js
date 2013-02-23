require.config({
    baseUrl: "/scripts",
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-mocks': {
            deps: ['angular'],
            init: function(angular) {
                return angular.mock;
            }
        }
    }
});

var defineModule = function(options) {
    options.moduleDeps = options.moduleDeps || [];
    options.fileDeps = options.fileDeps || [];
    options.fileDeps.unshift('angular');
    var i;
    for (i = 0; i < options.moduleDeps.length; i++) {
        options.fileDeps.push(options.moduleDeps[i]);
    }
    for (i = 0; i < options.fileDeps.length; i++) {
        options.fileDeps[i] = options.fileDeps[i].replace(/[.]/g, '/');
    }
    define(options.fileDeps, function (angular) {
        var module = angular.module(options.name, options.moduleDeps, options.configFn);
        if (typeof options.callback === 'function') {
            var args = [module];
            for (var j = 1; j < arguments.length; j++) {
                args.push(arguments[j]);
            }

            options.callback.apply(require, args);
        }
        return module;
    });
};
