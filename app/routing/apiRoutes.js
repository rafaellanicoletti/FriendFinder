var path = require('path');
var fs = require('fs');
var friends = require('../data/friends.js');


module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });
    app.post('/api/friends', function (req, res) {
    
        var userInput = req.body;

        var userResponses = userInput.scores;


        // Compute best friend match
        var matchName = '';
        var matchImage = '';
        var totalDifference = 9999; // Make the initial value big for comparison

        // Examine all existing friends in the list
        for (var i = 0; i < friends.length; i++) {


            // Compute differenes for each question
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }


            // If lowest difference, record the friend match
            if (diff < totalDifference) {

                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        // Add new user
        friends.push(userInput);
        console.log("friends", friends);

        fs.appendFile('friendlist.txt', JSON.stringify(friends), (err, data) => {
            if (err) {
                console.log(err)
            }
            console.log("Finished writing file")

        });

        // Send appropriate response
        res.json({ status: 'OK', matchName, matchImage });
    });
};
