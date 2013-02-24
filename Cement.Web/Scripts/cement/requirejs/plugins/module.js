define({
    load: function (name, req, onload, config) {
        var path = name.replace(/[.]/g, '/');
        req([path], function (module) {
            console.log('module:', path, module);
            onload(module);
        });
    }
});