(function (requirejs) {
    var requireCfg = {
        waitSeconds: 600,
        paths: {
            'name': '/shared/requirejs/plugins/name',
            'module': '/shared/requirejs/plugins/module',
            'css': '/shared/requirejs/plugins/css',
            'normalize': '/libs/normalize',
            'text': '/shared/requirejs/plugins/text',
            'json': '/shared/requirejs/plugins/json',
            'jquery': '/libs/jquery-1.9.1',
            'bootstrap': '/libs/bootstrap/bootstrap.min',
            'underscore': '/libs/underscore.min',
            'angular': '/libs/angular/angular',
            'angular-mocks': '/libs/angular/angular-mocks',
            'extensions': '/shared/helpers/extensions',
            'jquery-ui': '/libs/jquery-ui/jquery-ui-1.10.1.custom.min',
            'json2': '/libs/json2',
            'wysihtml5': '/libs/wysihtml5/wysihtml5-0.3.0.min',
            'bootstrap-wysihtml5': '/libs/bootstrap/bootstrap-wysihtml5/bootstrap-wysihtml5-0.0.2',
            // css
            'jquery-ui-styles': '/libs/jquery-ui/themes/custom-theme/jquery-ui-1.10.1.custom',
            'bootstrap-wysihtml5-styles': '/libs/bootstrap/bootstrap-wysihtml5/bootstrap-wysihtml5-0.0.2',
            'wysihtml5-color': '/libs/wysihtml5/wysiwyg-color',
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
            'jquery-ui': {
                deps: ['jquery', 'css!jquery-ui-styles']
            },
            'wysihtml5': {
                deps: ['css!wysihtml5-color']
            },
            'bootstrap-wysihtml5': {
                deps: ['jquery', 'bootstrap', 'wysihtml5', 'css!bootstrap-wysihtml5-styles'],
                init: function ($) {
                    return $.fn.wysihtml5;
                }
            }
        }
    };

    requirejs.config(requireCfg);
    requirejs.onError = function(error) {
        console.error('require error: ', error);
    };
})(requirejs);

define(['jquery', 'angular', 'extensions', 'json2'], function() {
});
