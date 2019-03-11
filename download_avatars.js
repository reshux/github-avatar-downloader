var request = require('request');
var fs = require('fs');
var token = require('./secrets.js');

var owner = process.argv[2]
var repo = process.argv[3]

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
    var initObj = JSON.parse(body);
    cb(err, initObj);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));

}

getRepoContributors(owner, repo, function(err, result) {
  for (var person of result) {
    downloadImageByURL(person.avatar_url, "avatars/" + person.login + ".jpg");
  }
});


