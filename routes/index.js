var express = require('express');
var router = express.Router();

var esrever = require('esrever');
var unirest = require('unirest');
var token = '8608e5d953f1b41486e51bed97e58fa8';


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "Diego's code2040-2017 Express API" });
});

router.get('/step1', function(req, res) {
  unirest.post('http://challenge.code2040.org/api/register')
    .type('json')
    .send({
      token: token,
      github: 'https://github.com/diegofigs/code2040-2017',
    })
    .end(function(response){
      console.log('Final response: '+ response);
      res.send(response);
    });
});

router.get('/step2', function(req, res) {
  unirest.post('http://challenge.code2040.org/api/reverse')
    .type('json')
    .send({
      token: token,
    })
    .end(function(string){
      console.log('Step 2 string: '+ string.body);
      var reverse = esrever.reverse(string.body);
      console.log('Step 2 reversed: '+ reverse);
      unirest.post('http://challenge.code2040.org/api/reverse/validate')
        .type('json')
        .send({
          token: token,
          string: reverse,
        })
        .end(function(response){
          console.log('Final response: '+ response);
          res.send(response);
        });
    });
});

router.get('/step3', function(req, res){
  unirest.post('http://challenge.code2040.org/api/haystack')
    .type('json')
    .send({
      token: token,
    })
    .end(function(collection){
      console.log('Step 3 collection: '+ collection.body);
      var needle = collection.body.needle;
      var haystack = collection.body.haystack;
      var i = 0;
      haystack.forEach(function(string){
        if(needle === string){
          unirest.post('http://challenge.code2040.org/api/haystack/validate')
            .type('json')
            .send({
              token: token,
              needle: i,
            })
            .end(function(response){
              console.log('Final response: '+ response);
              res.send(response);
            });
        }
        i = i + 1;
      });
    });
});

module.exports = router;
