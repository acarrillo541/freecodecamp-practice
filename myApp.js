require('dotenv').config()

let express = require('express');
let app = express();
let bodyParser=require('body-parser');


absolutePath=__dirname + "/views/index.html";
path=__dirname + "/public";

//use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended:false}));

app.use("/public",express.static(path));

app.use(function (req,res,next){
  next();
});

app.get("/now", function(req,res,next){
  // add the current time to the req.time
  var time = new Date().toString();
  req.time=time;
  next();
}, function(req,res){
  ret={"time":req.time};
  res.json(ret);
});

app.get("/:word/echo", function(req,res){
  var word = req.params.word
  console.log("here is the word->",word);
  var wordJson = {"echo":word};
  res.json(wordJson);
});

//get data from POST requests
/*
app.get("/name", function(req,res){
  var fName;
  var lName;
  var {first:fname, last:lname}=req.query;
  name={"name":fname+' '+lname};
  res.json(name);
});
*/

app.post("/name", function(req,res){
  var fName;
  var lName;
  var {first:fname, last:lname}=req.body;
  name={"name":fname+' '+lname};

  res.json(name);
});

app.get("/", function(req,res){
  res.sendFile(absolutePath);
});

app.get("/json", function(req,res){
  message={"message":"Hello json"};
  if (process.env.MESSAGE_STYLE == "uppercase"){
    message.message=message.message.toUpperCase();
  }
  if (process.env.MESSAGE_STYLE == "lowercase"){
    message.message=message.message.toUpperCase();
  }

  res.json(message);
});

console.log("Hello Express");


module.exports = app;
