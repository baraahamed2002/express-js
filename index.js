console.clear();
const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  fs.readFile("./index.html", (err, data) => {
    return res.end(data);
  });
});
app.get("/contact", (req, res) => {
  fs.readFile("./Contact.html", (err, data) => {
    return res.end(data);
  });
});

// nodemailer

app.post("/contact", async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hamedbaraa198@gmail.com",
      pass: "",
    },
  });
  const { Email, Subject, Msg } = req.body;
  const mailOptions = {
    from: "elkadhioussama93@gmail.com",
    to: Email,
    subject: Subject,
    text: Msg,
  };

  try {
    const sendMailer = await transporter.sendMail(mailOptions);
    fs.readFile("./sendMail.html", (err, data) => {
      if (err) console.log(err);
      return res.end(data);
    });
  } catch (error) {
    console.log(error);
  }

});

app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("Server is running");
});
  