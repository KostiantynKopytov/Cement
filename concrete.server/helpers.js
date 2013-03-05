(function(module, require) {
    var Q = require('Q');

    String.prototype.endsWith = function(str) {
        var indexOf = this.indexOf(str);
        return (indexOf >= 0) && ((indexOf + str.length) == this.length);
    };

    String.prototype.startsWith = function(str) {
        var indexOf = this.indexOf(str);
        return indexOf == 0;
    };

    var readPost = function(req) {
        var q = Q.defer();
        var post = '';
        req.on('data', function(chunk) { post += chunk; });
        req.on('end', function() { q.resolve(post); });
        req.on('error', function(error) { q.reject(error); });
        req.on('close', function() { q.reject("conntection closed"); });
        return q.promise;
    };

    module.exports.readPost = readPost;

})(module, require);