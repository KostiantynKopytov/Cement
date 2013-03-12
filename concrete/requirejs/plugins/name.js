define({
    load: function (name, req, onload, config) {
        onload(name);
    },
    normalize: function (name, normalize) {
        return normalize(name);
    }
});