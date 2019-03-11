var request = require('request');
var fs = require('fs');
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
    var initObj = JSON.parse(body)
    cb(err, initObj);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(getRepoContributors())
  .pipe(fs.createWriteStream('./future.jpg'))
  // ...
}

getRepoContributors("jquery", "jquery", function(err, result) {
  for (var i = 0; i < Object.keys(result).length; i++) {
    console.log(Object.values(result)[i].avatar_url)
  }
});
