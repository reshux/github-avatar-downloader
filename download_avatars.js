// request modules
require('dotenv').config();
var request = require('request');
var fs = require('fs');

// get the input from command line
var owner = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  // access the requested contributors URL
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.GITHUB_TOKEN
    }
  };
  // check to see if input for both a username and repo actually exists
  if (owner === undefined || repo === undefined){
    console.log("ERROR! You have to input both a user and a repo name!");
  } else {
    request(options, function(err, res, body) {
      // parse the JSON coming from API
      var initObj = JSON.parse(body);
      // synchronously create a directory for the avatars.
      fs.mkdirSync('./avatars');
      // feed the array of contributor objects to callback function
      cb(err, initObj);
  });
  }

}

function downloadImageByURL(url, filePath) {
  // use .pipe and fs.createWriteStream
  request.get(url).pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, repo, function(err, result) {
  for (var person of result) {
    downloadImageByURL(person.avatar_url, "avatars/" + person.login + ".jpg");
  }
});


