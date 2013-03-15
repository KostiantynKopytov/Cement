(function (requirejs) {
    var requireCfg = {
        waitSeconds: 600,
        paths: {
            // require [lugins
            'name': '/requirejs/plugins/name',
            'module': '/requirejs/plugins/module',
            'css': '/requirejs/plugins/css',
            'text': '/requirejs/plugins/text',
            'json': '/requirejs/plugins/json',
            // libs
            'jquery': '/libs/jquery-1.9.1.min',
            'jquery-ui': '/libs/jquery-ui/jquery-ui-1.10.1.custom.min',
            'angular': '/libs/angular/angular.min',
            'angular-mocks': '/libs/angular/angular-mocks',
            'wysihtml5': '/libs/wysihtml5/wysihtml5-0.3.0.min',
            'bootstrap': '/libs/bootstrap/bootstrap.min',
            'bootstrap-wysihtml5': '/libs/bootstrap/bootstrap-wysihtml5/bootstrap-wysihtml5-0.0.2',
            'underscore': '/libs/underscore.min',
            'extensions': '/core/helpers/extensions',
            'json2': '/libs/json2',
            // css
            'jquery-ui-styles': '/libs/jquery-ui/themes/custom-theme/jquery-ui-1.10.1.custom',
            'bootstrap-wysihtml5-styles': '/libs/bootstrap/bootstrap-wysihtml5/bootstrap-wysihtml5-0.0.2',
            'wysihtml5-color': '/libs/wysihtml5/wysiwyg-color',
            'main': '/content/styles/less/main.less'
        },
        shim: {
            'angular': {
                deps: ['jquery'],
                exports: 'angular'
            },
            'angular-mocks': {
                deps: ['angular'],
                init: function(angular) {
                    return angular.mock;
                }
            },
            'jquery': {
                exports: '$'
            },            
            'underscore': {
                exports: '_'
            },
            'jquery-ui': ['jquery', 'css!jquery-ui-styles'],
            'wysihtml5': ['css!wysihtml5-color'],
            'bootstrap-wysihtml5': ['jquery', 'bootstrap', 'wysihtml5', 'css!bootstrap-wysihtml5-styles']
        }
    };

    requirejs.config(requireCfg);
    requirejs.onError = function(error) {
        console.error('require error: ', error);
    };
})(requirejs);

define(['jquery', 'angular', 'extensions', 'json2'], function() {
});
