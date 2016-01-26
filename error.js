var stackTrace = require('stack-trace');
var logger = require('./log');
var traceback = require('traceback');

var error = function(res, err, errType, errCode, errSubCode, nestedErr) {
    // var trace = stackTrace.parse(err);
    if (nestedErr != null) {
        logger.error(nestedErr.stack);

        if (err.message === null || err.message.length === 0) {
            err.message = nestedErr.message;
        }
    }

//    var stack = traceback();
//    var origin = stack[1].file  + ":" + stack[1].line;

    res.json(
        {
            error: {
                message: err.message,
                type: errType,
//                origin: origin,
                code: errCode,
                error_subcode: errSubCode
            }
        }
    );
};

module.exports=error;
