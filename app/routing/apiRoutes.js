var friends = require("../data/friends.js");

module.exports = function (app) {

    // view all friends
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        
        // var to capture bestMatch
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000 // use to track diff between answers
        };

        console.log(req.body);

        // parse user input data
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        // calculate the difference
        var totalDiff = 0;

        // loop through all possibilities in the friends list
        for (var i = 0; i < friends.length; i++) {
            
            console.log(friends[i]);
            totalDiff = 0;

            // nested loop through scores for each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {

                // calc the difference, use abs so that higher and lower scores are treated the same
                totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j])); 

                // capture best match by comparing current totalDiff to previous bestMatch
                if (totalDiff <= bestMatch.friendDifference) {

                    // only replacing if the current comparison is less different than the previous bestMatch
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDiff;
                }
            }
        }

        // push user to friends array AFTER we do the comparison above
        // otherwise the user would be their own best friend since they have same exact scores
        friends.push(userData);

        // return new bestMatch JSON object
        res.json(bestMatch);

    });
}