var request = require('request');
var token = require('./secrets.js');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token' + token.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  var initObj = JSON.parse(result)
  for (var i = 0; i < Object.keys(initObj).length; i++) {
    console.log(Object.values(initObj)[i].avatar_url)
  }
});

