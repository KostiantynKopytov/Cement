require(['../requirejs/config'], function() {
    require(['module!core!deps', 'css!main'], function(core) {
        var html = document.getElementsByTagName('html');
        angular.bootstrap(html, ['core']);
    });
});