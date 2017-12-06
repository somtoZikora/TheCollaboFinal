/**
 * Created by opaluwa john on 12/4/2017.
 */
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER ,
    pass: process.env.SENDGRID_PASSWORD
  }
});


/**
 *  GET /contact
 *  Contact form page
 **/
exports.getContact = (req, res) => {
  console.log('I am here for get')
 /* res.render('contact',{
    title: 'Contact'
  })*/
 res.send('hello world')
}

/**
 * POST /Contact
 * Send a contact form via Nodemailer
 **/
exports.postContact = (req, res) => {
  //req.checkBody('name', 'Name cannot be blank').notEmpty();
  //req.checkBody('email', 'Email is not valid').isEmail();
 // req.checkBody('message', 'Message cannot be blank').notEmpty();

  const  errors = req.validationErrors();
  const mailOptions = {
    to: 'johnopaluwa@gmail.com',
    from: `${req.body.name} <${req.body.email}>`,
    subject: `${req.body.subject}`,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err) => {
    if(err){
      console.log(err)
    }
    else{
      console.log('Success all the way')
      res.send({sent: "true"})
    //res.send(req.body)
    }
});

};
