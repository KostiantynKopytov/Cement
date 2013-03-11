(function (module, require, process) {
    var Q = require('Q');
    var fs = require('fs');
    var path = require('path');
    var less = require('less');

    var file = process.argv[2];

    return Q.try(Q.nfbind(fs.readFile, file, 'utf8'))
        .then(function(data) {
            var parser = new (less.Parser)({
                paths: [path.dirname(file)],
                filename: path.basename(file)
            });
            return Q.ninvoke(parser, "parse", data);
        }).then(function (tree) {
            process.send({ statusCode: 200, content: tree.toCSS({ compress: true }), headers: { 'content-type': 'text/css' } });
        }).catch(function (error) {
            process.send({ statusCode: 500, reason: error.stack });
            process.exit(-1);
        }).done(function () {
            process.exit(0);
        });
})(module, require, process);