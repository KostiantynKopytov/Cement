var requireCfg = {
    baseUrl: "/scripts",
    paths: {
        css: '/scripts/cement/requirejs/plugins/css',
        module: '/scripts/cement/requirejs/plugins/module',
        service: '/scripts/cement/requirejs/plugins/service',
        _: '/scripts/underscore',
        jquery: '/scripts/jquery-1.9.1',
        extensions: '/scripts/cement/helpers/extensions'
    },
    shim: {
        'angular': {
            exports: 'angular',
            init: function () {
                return angular;
            }
        },
        'angular-mocks': {
            deps: ['angular'],
            init: function (angular) {
                return angular.mock;
            }
        },
        'angular-resource': {
            deps: ['angular']
        },
        '_': {
            init: function () {
                return _;
            }
        }
    }
};
