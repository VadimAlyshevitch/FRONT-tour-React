const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cred = require('./gmailCred')

const PORT = 3001

const app = express()

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: cred.mail,
      pass: cred.password
    }
  });
  
  /*
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  */

  const sendMail = ({ email, title, body }) => {
      transporter.sendMail({
          from: 'vadimpwnz228@gmail.com',
          to: email,
          subject: title,
          text: body,
      })
  }

app.use(cors())

app.post('/send', bodyParser.json(), (req, res) => {
    const {
        title,
        body,
        from,
        to,
        text,
    } = req.body

    sendMail({
        email: to,
        title,
        text,
    })

    res.json('ok')
})

app.listen(PORT, () => {
    console.log('App is listening on port ' + PORT)
})