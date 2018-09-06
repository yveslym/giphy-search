const express = require("express");
const app = express();
const hbs  = require('express-handlebars'); 
const http = require('http');
const path = require('path');
const port = process.env.port || 3000;
const giphy = require('giphy-api')();

//setting up the template engine
app.engine('hbs',hbs({extname:'hbs',
defaultLayout: 'main',
layoutsDir: __dirname + '/views/layouts/'
}));
//app.engine('hbs', exphbs({defaultLayout: 'main'}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

app.use(express.static('public'));



app.get('/', function (req, res) {

  let term = req.query.term;
  if (term){
  giphy.search(term, function (err, response) {
    res.render('search-giphy', {gifs: response.data});
    });
  }
  else{
// Trending Hot 100 gifs using callback
giphy.trending(function (err, response) {
  res.render('search-giphy', {gifs: response.data});
});
  }
});



  // app.get('/', function (req, res) { 
  //  let queryString = req.query.term;

  //  giphy.search(req.query.term, function(err,response){
  //    render ('home',{gifs: response.data})
  //  });
  // });

  //  let term = encodeURIComponent(queryString) 
  //  let url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';

  //  http.get(url,(response) => {
  //   response.setEncoding('utf8');
  //   let body = '';
  //   response.on('data',(d)=> {

  //     body += d;
  //   });
  //   // parse the json after getting all the data and render
  //   response.on('end',() => {
  //     let parsed = JSON.parse(body);
  //     res.render('search-giphy',{gifs:parsed.data})
  //   });
  //  });
  

  app.listen(port, () =>{
    console.log('giphy search listening on port: ', port);
  });