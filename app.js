"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var logger = require('./log.js');

process.on('uncaughtException', function ( err ) {
    logger.error('An uncaughtException was found, the program will end.');
    logger.error(err + err.stack);
    //hopefully do some logging.
    process.exit(1);
});

logger.info("Starting codeJam API...");

logger.debug("Loading packages...");
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('port', 3000);

logger.debug("Loading Libs");
var codeJam = require('./codeJam');

logger.debug("Mapping REST APIs");

app.get('/api/codeJam/list', codeJam.getJamLists);
app.get('/api/codeJam/result/:id', codeJam.getResult);
app.get('/api/codeJam/question/:id', codeJam.getQuestions);
app.get('/api/codeJam/answer/:id', codeJam.getAnswers);
app.post('/api/codeJam/upload', codeJam.upload);

var http = require('http');
var server = http.createServer(app);

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

server.listen(app.get('port'), function () {
    var address = server.address();
    logger.info('server listening on http://%s:%d', address.address, address.port);
    logger.info('press CTRL+C to exit');
});

function cleanup() {
    server._connections = 0;
    server.close(function () {
        process.exit();
    });

    setTimeout(
        function () {
            logger.error("Could not close connections in time, forcing shut down");
            process.exit(1);
        }, 30 * 1000);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

