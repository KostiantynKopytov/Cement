var requireCfg = {
    baseUrl: "/scripts",
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-mocks': {
            deps: ['angular'],
            init: function (angular) {
                return angular.mock;
            }
        }
    }
};


