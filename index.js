const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const nodemailer = require("nodemailer")
const e = require('express')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body.data;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER, // generated ethereal user
            pass: process.env.PASS, // generated ethereal password
        },
    });
    const mail = {
        from: `${name}`,
        to: `akibbhh@gmail.com`,
        subject: 'Contact Form Submission - EduWell',
        html:
            `<p> Name: ${name}</p>
        <p> Email: ${email}</p>
        <p> Message: ${message}</p>`
    }
    await transporter.sendMail(mail, (err, document) => {
        if (err) {
            res.send(err)
        } else {
            console.log(document);
            res.send(document.response === '')
        }
    })
})
app.listen(process.env.PORT || 5000)