"use strict";

var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(
            {
                level: 'debug',
                silent: false,
                colorize: true,
                timestamp: true
            }
        ),
        new (winston.transports.File)(
            { 
                filename: 'winston.log',
                level: 'debug',
                silent: false,
                colorize: true,
                timestamp: true,
                json: false,
                maxFiles: 5,
                maxsize: 10485760,
                handleExceptions: true
            }
        )
    ]
});

module.exports = logger;
