require.config({
    baseUrl: "/scripts",
    shim: {
        'angular': {
            exports: 'angular'
        }
    }
});

var defineModule = function (name, moduleDeps, fileDeps, configFn) {
    moduleDeps = moduleDeps || [];
    fileDeps = fileDeps || [];
    fileDeps.unshift('angular');
    var i;
    for (i = 0; i < moduleDeps.length; i++) {
        fileDeps.push(moduleDeps[i]);
    }
    for (i = 0; i < fileDeps.length; i++) {
        fileDeps[i] = fileDeps[i].replace(/[.]/g, '/');
    }
    console.log('defineModule', name, fileDeps, moduleDeps, configFn);
    define(fileDeps, function (angular) {
        console.log('defineModule inner', name, fileDeps, moduleDeps, configFn);
        return angular.module(name, moduleDeps, configFn);
    });
};
