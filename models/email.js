var validator = require('validator');
var nodemailer = require('nodemailer');
// var mailer_auth = require('./mailer_auth');

// maintain one mail transporter for all instances
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { } /*mailer_auth*/
});

// constructor
function Email(from, to, subject, body) {
    this.from = new Email.prototype.Field(from);
    this.to = new Email.prototype.Field(to);
    this.subject = new Email.prototype.Field(subject);
    this.body = new Email.prototype.Field(body);
}

// send email
Email.prototype.send = function() {
    transporter.sendMail({
      from: this.from.value,
      to: this.to.value,
      subject: this.subject.value,
      text: this.body.value
  });
};

// validate fields and provide error messages
Email.prototype.validate = function() {
    var isValid = true;
    if (!validator.isEmail(this.from.value)) {
        this.from.error = 'Please use a valid email address';
        isValid = false;
    } if (!this.subject.value) {
        this.subject.error = 'Please provide a subject line';
        isValid = false;
    } if (!this.body.value) {
        this.body.error = 'Please write a message';
        isValid = false;
    }
    return isValid;
};
    
// each field for the Email object consists of a value and possibly an error message
Email.prototype.Field = function(val, err) {
    this.value = val;
    this.error = err ? err : '';
};

// define the HTML attributes to be rendered
Email.prototype.FormInput = function(type, name, label, placeholder, value, error) {
    this.type = type;
    this.name = name;
    this.label = label;
    this.placeholder = placeholder;
    this.value = value;
    this.error = error;
};

// form fields to be parsed in template
Email.prototype.generateForm = function() {
    return [
        new Email.prototype.FormInput('email', 'from', 'Email Address', "I'll be sure to get back to you at this email address", this.from.value, this.from.error),
        new Email.prototype.FormInput('text', 'subject', 'Subject', "What's this message regarding?", this.subject.value, this.subject.error),
        new Email.prototype.FormInput('textArea', 'body', 'Message', 'Leave me a message!', this.body.value, this.body.error)
    ];
};

// save values of fields to database
Email.prototype.persist = function() {
    return {
        from : this.from.value,
        to : this.to.value,
        subject : this.subject.value,
        body : this.body.value
    }
};

module.exports = Email;
