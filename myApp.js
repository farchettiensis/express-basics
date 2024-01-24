let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// #4
app.use('/public', express.static(__dirname + '/public'));

// #10
app.use(bodyParser.urlencoded({extended: false}));

// #6
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// #1
console.log("Hello World");

// #2
/*
app.get('/', (req, res) => {
  res.send("Hello Express");
});
*/

// #3
app.get('/', (req, res) => {
  const filePath = __dirname + '/views/index.html';
  res.sendFile(filePath);
});

// #7
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
});

// #5
app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ "message": "HELLO JSON" });
  } else {
    res.json({"message": "Hello json"});
  }
});

// #8
app.get('/:word/echo', (req, res) => {
  let word = req.params.word;
  res.json({echo: req.params.word});
});

// #9
app.route('/name')
  .get((req, res) => {
    let { first, last } = req.query;
    res.json({name: `${first} ${last}`});
  }) // #11
  .post((req, res) => {
    res.json({name: `${req.body.first} ${req.body.last}`});
  });
























 module.exports = app;
