var path = require('path');

// export html routes
module.exports = function (app) {

    // when user hits URL /survey, deliver the survey.html file
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });

    // if user not on predefined URL, bring them to homepage via home.html file
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });
}