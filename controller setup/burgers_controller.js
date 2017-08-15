//required npm//

var express = require('express');
var burger_router = express.Router();
var burger_call = require('../models/burger.js');
var bodyParser = require('body-parser');

burger_router.use(bodyParser.json());
burger_router.use(bodyParser.urlencoded({extended: false}));
burger_router.use(bodyParser.text());
burger_router.use(bodyParser.json({type:'application/vnd.api+json'}));


//request the user and respond//
burger_router.get('/', function(req,res){
  res.redirect('/burger');
});

//collect the data, insert data and console.log//
burger_router.get('/burger', function(req,res){
  burger_call.read(function(data){
    // console.log(data);
    var hbs_object = {burger: data};
    // console.log(hbs_object);
    res.render('index', hbs_object);
  });
});

//user choices to add function//
burger_router.post('/burger/add', function(req, res){
  // console.log(req.body.user_burger)
  burger_call.insert(req.body.user_burger, function(data){
    res.redirect('/burger');
  });
});

burger_router.put('/burger/update/:id?', function(req,res){
  var user_id = parseInt(req.params.id);
  burger_call.update(user_id, function(data){
    res.redirect('/burger');
  });
});

burger_router.put('/burger/delete/:id?', function(req,res){
  var user_id = parseInt(req.params.id);
  burger_call.delete(user_id, function(data){
    res.redirect('/burger');
  });
});
//send it back to server//
module.exports = burger_router;