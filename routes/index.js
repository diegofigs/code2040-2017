var express = require('express');
var router = express.Router();

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

module.exports = router;
