const contact = require("express").Router();
const nodemailer = require("nodemailer");
const { EMAIL_TO, EMAIL_FROM } = require("../utils/urls");

contact.post("/", (req, res, next) => {
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  // const validPhoneRegex = RegExp(/^[+]*[0-9]+$/);

  if (req.body.Name && req.body.Email && req.body.Enquiry) {
    if (!validEmailRegex.test(req.body.Email)) {

      const error = new Error("Email is invalid!");
      error.status = 400;
      next(error);
    }
    next();
  } else {
    const error = new Error("Bad request!");
    error.status = 400;
    next(error);
  }
});

contact.post("/", async (req, res, next) => {
  const bodyHTML = `
  <b>Hello admin,</b> <br> <br>
  
  Reply by clicking on the email or copy and paste it in your form!<br><br>
  Full name: ${req.body.Name}<br>
  Email: <a href="mailto:${req.body.Email}">${req.body.Email}</a><br>
  Phone: ${req.body.Phone || "-"}<br>
  Enquiry: <br>" <em>${req.body.Enquiry}</em>"
`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  let info = transporter.sendMail(
    {
      from: EMAIL_FROM, // sender address
      to: EMAIL_TO, // list of receivers
      subject: `${req.body.Name} has sent you a message! - juanpamusic.com`, // Subject line
      html: bodyHTML,
    },
    function (err, data) {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ message: "Message sent!" });
      }
    }
  );
});

module.exports = contact;
