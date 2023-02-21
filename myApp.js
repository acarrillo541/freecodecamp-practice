require('dotenv').config()

let express = require('express');
let app = express();


absolutePath=__dirname + "/views/index.html";
path=__dirname + "/public";

app.use("/public",express.static(path));

app.use(function (req,res,next){
  var ret = req.method+" "+req.path+" - "+req.ip;
  console.log(ret);
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
