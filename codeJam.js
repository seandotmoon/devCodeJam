"use strict";

var logger = require('./log.js');
var prettyjson = require('prettyjson');
var ggsError = require('./error.js');
var fs = require('fs');
var async = require('async');
var config = require('./config');


// Read File
function readFile(path, callback) {
	fs.readFile(path, 'utf8', callback);
};

function getJamList(callback) {
	readFile(config.jamListFilePath, function (err, data) {
	  	if (err) {
	    	callback(err, undefined);
	  	} else {
	  		var jsonContent = JSON.parse(data);
	  		callback(null, jsonContent);
	  	}
	});
};

function getThings(req, res, type) {
	readFile('./' + type + '/' + req.params.id, function (err, data) {
	  	if (err) {
	    	ggsError(res, err, "", 102, 0);
	  	} else {
	  		return res.json(200, data);
	  	}
	});
};

function saveFile(data, path, callback) {
  	var newPath = __dirname + "/" + path;
  	fs.writeFile(newPath, data, function (err) {
    	callback(err);
  	});
}

function saveSubmissionAndCheckAnswer(info, file, callback) {
	fs.readFile(file.path, function (err, data) {
		var answer = {};
		async.parallel([
			function(callback){
		        saveFile(config.submissionPath + info.questionId + "/" + info.uerId + "/" + new Date().getTime(), data, function(err) {
		        	if(err) 
		        		callback(err);
		        });
		    },
		    function(callback) {
		        readFile('./answer/' + info.questionId, function(err, result) {
		        	answer = result;
		        });
		    }
		],
		function(err) {
		    if(err) 
		    	callback(err, null);
		    else {
		    	if(data.toString() === answer.toString()) {
		    		callback(err, "Y");
		    	} else {
		    		callback(err, "N");
		    	}
		    }
		});
	});
};

function updateScoreBoard(info, isCorrect, callback) {
	readFile(config.scoreBoardFilePath, function (err, data) {
		var scoreBoard = JSON.parse(data);
		if(!scoreBoard) {
			scoreBoard = [];
		} 
		var questions = scoreBoard[info.questionId];
		if(!questions) {
			questions = [];
		}
		var userSubmissionLists = questions[info.userId];
		if(!userSubmissionLists) {
			userSubmissionLists = [];
		}

		var dataToPush = { date: new Date().getTime(), isCorrect: isCorrect };
		userSubmissionLists.push(dataToPush);
		saveFile(onfig.scoreBoardFilePath, scoreBoard.toString(), function(err) {
    		callback(err);
        });
	});
}

function upload(info, file, callback) {
    // process file
    if (!file || rfile.size == 0) {
      	callback('File is empty', null);
    } else {
    	saveSubmissionAndCheckAnswer(info, file, function(err, isCorrect) {
    		if(err) {
    			callback(err, null);
    		} else {
    			updateScoreBoard(info, isCorrect, function(err) {
    				if(err) {
    					callback(err, null);
    				} else {
    					callback(null, null);
    				}
    			});
    		}
    	});
    }
}

// GET List of Jams
exports.getJamLists = function(req, res) {
	getJamList(function(err, result) {
		if(err) {
			ggsError(res, err, "", 102, 0);
		} else {
			return res.json(200, result);
		}
	});
};
// GET Results
exports.getResult = function(req, res) {
	getThings(req, res, "result");
};
// GET Questions
exports.getQuestions = function(req, res) {
	getThings(req, res, "question");
};
// GET Answers
exports.getAnswers = function(req, res) {
	getThings(req, res, "answer");
};
// POST Answers
exports.upload = function (req, res) {
    upload(req.param, req.files.file, function(err, result) {
		if(err) {
			ggsError(res, err, "", 102, 0);
		} else {
			return res.json(200, result);
		}
	});
};