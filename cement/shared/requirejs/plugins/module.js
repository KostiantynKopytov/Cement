define({
    load: function (name, req, onload, config) {
        onload(angular.module(name, []));
    }
});
