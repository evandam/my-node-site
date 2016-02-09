var express = require('express');
var router = express.Router();
var Email = require('../models/email');

/* GET email. Show form */
router.get('/', function(req, res) {
    var email = new Email();
    res.render('mail', {
        title: 'Contact me',
        form: email.generateForm()
    });
});

/* POST email. Send it to me and save to database */
router.post('/', function(req, res) {
    // render a populated email from POST data
    var email = new Email(req.body.from, 
                          'evandam92@gmail.com', 
                          req.body.subject, 
                          req.body.body);
    if(email.validate()) {
        email.send();
        req.db.emails.insert(email.persist());
        res.redirect('/mail/thanks');
    } else {
        res.render('mail', {
            title: 'Contact me',
            form: email.generateForm(),
            message: 'Oops, I had some trouble handling your request...'
        });
    }
});

/* DELETE email. Remove it from the database (requires auth) */
router.delete('/:id', function(req, res) {
    req.db.emails.remove({ _id: mongo.ObjectID(req.params.id)}, function(err, result) {
        console.log(err);
        cosole.log(result);
    });
    res.send('Delete this?'); 
});

/* GET thanks. Simple confirmation page for email */
router.get('/thanks', function(req, res) {
    res.render('thanks', { title: 'Thank you!' });
});

/* GET inbox. Read the database (requires auth) */
router.get('/inbox', function(req, res) {
    req.db.emails.find().toArray(function(err, emails) {
        res.render('inbox', { emails: emails });    
    });
});
module.exports = router;
