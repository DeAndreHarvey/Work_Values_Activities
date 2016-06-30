var express = require("express");
var path = require("path");
var app = express();


app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
// root route to render the index.ejs view
// post route for adding a user
// app.post('/result', function(req, res) {
//  console.log("POST DATA", req.body);
//  res.render('result',{result: req.body});
// })
// // tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
})
