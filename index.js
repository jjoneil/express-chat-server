
// Write a new endpoint on the server, "/log/:username", which shows all of the messages sent by one user.

// For example http://localhost:8080/log/erty will show a listing of all of the messages sent by user "erty".

// As a hint, look up "req.params" in node/express.

// You do not need to be able to send messages from this page. This is a page you will visit in the browser ("GET" request)

// Optionally, make it so that clicking on a user's name takes you to their log page from the main chat ("/") page.


var express = require("express");

var app = express();

var messages = []; //turn into object

//set up req.body
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.get("/chat", function(req, res){
	res.send(JSON.stringify(messages));
});
//post chat


// function (){
// 	// var user = messages[0];
// 	var wantedUser = messages[i]
// 	var userText = []
// 	for (var i = 0; i < messages.length; i++){
// 		var wantedUser = messages[i].username
// 		if(wantedUser ===){
// 		userText.push(messages[i].text);
// 		}
// 	}
// 	return userText;
// }


app.get("/log/:username", function(req, res){
	var wantedUser = req.params.username; 
	var userText = []
	for (var i = 0; i < messages.length; i++){
		if(wantedUser === messages[i].username){
		userText.push(messages[i].text);
		}
	}
	res.send(JSON.stringify(userText));
});

app.post("/chat", function(req, res){
	if(req.body.message){
		messages.push(req.body.message);
		res.send("success");
	} else{
		res.send("error");
	}
});

app.use(function(req, res, next){
	console.log(err);
	res.status(404);
	res.send("404 File Not Found");
});

app.use(function(err, req, res, next){
	console.log(err);
	res.status(500);
	res.send("500 Internal Server Error");
});

app.listen(8080, function(){
	console.log("Server started!");
});