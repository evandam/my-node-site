var express = require('express');
var router = express.Router();

var Email = require('../models/email');

/* GET home page. */
router.get('/', function(req, res, next) {
    // render a clean form
    var email = new Email.model();
    res.render('index', { 
        title: 'Express', 
        form: email.generateForm()
    });
});

/* Sending an email */
router.post('/', function(req, res, next) {
    // render the form from the request
    var email = new Email.model(req.body.from, 
                          'evandam92@gmail.com', 
                          req.body.subject, 
                          req.body.body);
    if(email.validate()) {
        email.send();
        res.redirect('/');
    } else {
        res.render('index', {
            title: 'Form',
            form: email.generateForm()
        });
    }
});

module.exports = router;
