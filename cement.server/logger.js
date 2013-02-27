var winston = require('winston');

winston.cli();

winston.loggers.add('default', {
    console: { level: 'silly', handleExceptions: true, },
    file: { level: 'silly', handleExceptions: true, filename: 'server.log' }
});

exports.get = function(name) {
    return winston.loggers.get(name || 'default');
};