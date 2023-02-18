let express = require('express');
let app = express();


absolutePath=__dirname + "/views/index.html";
path=__dirname + "/public";

app.use("/public",express.static(path));

app.get("/", function(req,res){
  res.sendFile(absolutePath);
});

app.get("/json", function(req,res){
  res.json({"message":"Hello json"});
});

console.log("Hello Express");


module.exports = app;
