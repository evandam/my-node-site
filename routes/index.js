var express = require('express');
var router = express.Router();

var Email = require('../models/email');
var CarouselItem = require('../models/carousel');

var carouselItems = [
    new CarouselItem(
        'node.js',
        'https://nodejs.org/',
        'https://nodejs.org/images/logos/nodejs.png'
    ),
    new CarouselItem(
        'HTML5',
        'http://www.w3.org/',
        'http://www.w3.org/html/logo/downloads/HTML5_Logo_256.png'
    ),
    new CarouselItem(
        'Android',
        'http://developer.android.com/index.html',
        'http://developer.android.com/images/brand/Android_Robot_200.png'
    ),
    new CarouselItem(
        'Java',
        'http://www.oracle.com/us/technologies/java/overview/index.html',
        'http://www.oracle.com/us/technologies/java/gimmejava/i-code-java-150x176-1705300.png'
    ),
    new CarouselItem(
        'Python',
        'https://www.python.org/',
        'https://www.python.org/static/community_logos/python-logo-master-v3-TM.png'
    )
];


/* GET home page. */
router.get('/', function(req, res) {
    // render a clean form on GET requests
    var email = new Email();
    res.render('index', { 
        title: 'Welcome', 
        carouselItems: carouselItems,
        form: email.generateForm()
    });
});

module.exports = router;
