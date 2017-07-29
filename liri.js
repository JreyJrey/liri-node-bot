//Commands Object
var commands = {
	mytweets: function(){
		var params = {screen_name: 'nodejs'};
		twit.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    for(i=0;i<tweets.length; i++){
		    	console.log((i+1)+": "+tweets[i].text+"\n-----------------------\n")};
		  }
		});
	},
	spotifythissong: function(songName){
		spotify.search({ type: 'track', query: songName }, function(err, data) {
		  	if (err) {
		    return console.log('Error occurred: ' + err);
			}
			var data = data.tracks.items[0]
			// console.log(data)
			console.log("Album: "+data.album.name);
			console.log("Artist: "+data.artists[0].name);
			console.log("Song Name: "+data.name);
			console.log("Link: "+data.external_urls.spotify); 
			debugger;
		});
	},
	moviethis: function(search){
		request('http://www.omdbapi.com/?t='+ (search || 'mr+nobody') + '&y=&plot=short&apikey=40e9cece',
			function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonData = JSON.parse(body);
				console.log('Title: ' + jsonData.Title);
				console.log('Year: ' + jsonData.Year);
				console.log('Rated: ' + jsonData.Rated);
				console.log('IMDB Rating: ' + jsonData.imdbRating);
				console.log('Country: ' + jsonData.County);
				console.log('Language: ' + jsonData.Language);
				console.log('Plot: ' + jsonData.Plot);
				console.log('Actors: ' + jsonData.Actors);
				// console.log('RottenTomatoes URL: ' + jsonData.tomatoURL);
			}
		});
	},
	//Takes in DoWhatItSays, then reads the Random.txt, then runs the original Command function wth new inputs.
	dowhatitsays: function(){
		fs.readFile('random.txt', 'utf8', function(err, data) {
			if (err) {
				throw err;
			}
			var dataArr = data.split(',');
			input = dataArr[0]
			input2 = dataArr[1]
			command(input,input2);
		});
	}
}

//Require Variables
	var keys = require("./keys");
	var Twitter = require('twitter');
	var Spotify = require('node-spotify-api');
	var omdb = require('omdb');
	var request = require("request");
	var fs = require("fs");
	var input = process.argv[2];
	var input2 = process.argv[3];

//Twitter Constructor
var twit = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

//Spotify Constructor
var spotify = new Spotify({
  id: keys.spotifyKeys.id,
  secret: keys.spotifyKeys.secret
}); 
 

//If Else for the input commands
function command(input, input2){
	if(input == "mytweets"){
		commands.mytweets();
	}
	else if(input == "spotifythissong"){
		// if(input2 is null){
		// 	commands.spotifythissong("The Sign")
		// }
		// else{
			commands.spotifythissong(input2)
		// }
	}

	else if(input == "moviethis"){
	commands.moviethis(input2)
	}
	else if(input == "dowhatitsays"){
	commands.dowhatitsays(input, input2);
	}
}

command(input, input2);