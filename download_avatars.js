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
    var initObj = JSON.parse(body);
    cb(err, initObj);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));

}

getRepoContributors("jquery", "jquery", function(err, result) {
  for (var person of result) {
    console.log(person.avatar_url);
  }
});


