var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Tell Express which Template engine we are using by NPM module name
app.set('view engine', 'jade');

//Tell Express where our template files live
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (request, response) {
  console.log('Getting index page');
  app.render('index', {name: 'Theo'}, function (err, html) {
    response.send(html);
  });
});

var wordSwap = {
  selfie: 'self-portrait',
  yummers : 'delicious',
  outchea : 'are out here',
  bruh : 'wow',
  doge : 'pug',
  cilantro : 'soap',
  bae : 'loved one',
  swag : 'style',
  yolo : 'carpe diem'
};

app.use('/', function (request, response, next) {
  if(request.body) {
    var input = request.body.content;
    var stringArray = input.split(' ');
    for(var i=0; i < stringArray.length; i++){
      if (wordSwap[stringArray[i]]) {
         stringArray[i] = wordSwap[stringArray[i]];
      }
    }
    stringArray = stringArray.join(' ');
    console.log(stringArray);
    response.locals.wordSwap = stringArray;
  }

  //next is passing to the next app.'function'
  return next();
});


app.post('/', function (request, response, next) {
  var message = response.locals.wordSwap;
  response.send(message);
});
//res.send(convertedString)














//set up a server
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server listening on ', port);
});