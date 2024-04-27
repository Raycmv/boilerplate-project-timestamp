// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const regexNum = /^[\d]+$/;
  let resdate = '';
  let unixTimestamp = '';
  let utcDate = '';
  //console.log(regex.test(date))

  if (date == null){
    resdate = new Date();
    unixTimestamp = Date.parse(resdate);
    utcDate = resdate.toUTCString();

  } else if (regex.test(date)){
    resdate = new Date(date);
    unixTimestamp = Date.parse(resdate) / 1000;
    utcDate = resdate.toUTCString();
    
  } else if (regexNum.test(parseInt(date))){
    resdate = new Date(parseInt(date));
    unixTimestamp = Date.parse(resdate) / 1000;
    utcDate = resdate.toUTCString();
    
  } else {
    res.json({ error: "Invalid Date" });
    return;
  }
  res.json({
          unix: unixTimestamp,
          utc: utcDate
      });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
