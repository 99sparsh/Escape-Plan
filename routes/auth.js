const express = require("express");
const router = express.Router();
const db = require("../config/conn");
const bcrypt = require("bcryptjs");
const to = require("../utils/to");
const validator = require("../utils/validator");
const nodemailer = require("nodemailer");

function makeid() {
  //for random string token
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 32; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

exports.register = async (req, res) => {
  let err, result, user;
  [err, result] = await to(
    db.query(`SELECT * FROM users WHERE email = ?`, [req.body.email])
  );
  if (result.length != 0) {
    return res.sendError(null, "Email already exists");
  }
  if (req.body.password != req.body.password2) {
    return res.sendError(null, "Passwords do not match");
  } else {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(req.body.password, salt, async (error, pass) => {
        if (error) return res.sendError(error);
        else {
          var token = makeid();
          var q = `INSERT INTO users (name,username,email,password,token,regno,phone) VALUES (?,?,?,?,?,?,?)`;
          [err, result] = await to(
            db.query(q, [
              req.body.name,
              req.body.username,
              req.body.email,
              pass,
              token,
              req.body.regno,
              req.body.phone
            ])
          );

          console.log(err);
          if (err) return res.sendError(err);
          //res.redirect('/')
          return res.sendSuccess("Successfully Registered. Proceed to Login");
        }
      });
    });
  }
};

exports.login = async (req, res) => {
  let err, user, result;
  [err, result] = await to(
    db.query(`SELECT * FROM users WHERE email = ?`, [req.body.email])
  );
  if (err) return res.sendError(err);
  if (result.length == 0) return res.sendError(null, "User does not exist");
  user = result[0];
  [err, result] = await to(bcrypt.compare(req.body.password, user.password));
  if (err) return res.sendError(err);
  if (!result) return res.sendError(null, "Invalid email/password combination");
  delete user.password;
  delete user.token;
  req.logIn(user, err => {
    if (err) return res.sendError(err);
    return res.sendSuccess(user.access, "Login Successful!");
  });
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.sendError(err);
    req.logout();
    return res.sendSuccess(null, { access: 0 });
  });
};

exports.forgotpassword = async (req, res) => {
  let err, result;
  [err, result] = await to(
    db.query(`SELECT * FROM users WHERE email = ?`, [req.body.email])
  );
  if (result.length == 0) return res.sendError(null, "User does not exist");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER,
      pass: process.env.MAIL_PASS
    }
  });
  var mailOptions = {
    from: process.env.MAILER,
    to: req.body.email,
    subject: "Escape Plan Password Reset",
    // text: 'Follow the link to reset your password ',
    html:
      '<p>Click <a href="https://escapeplan.techtatva.in/resetpassword?token=' +
      result[0].token +
      '">here</a> to reset your password</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) return res.sendError(error);
    else return res.sendSuccess(info.response, "Email sent");
  });
};

exports.resetpassword = async (req, res) => {
  let pass = req.body.password;
  let pass2 = req.body.password2;

  if (pass.length < 8)
    return res.sendError(null, "Password should be at least 8 characters long");
  if (pass != pass2) return res.sendError(null, "Passwords do not match");
  else {
    let q = req.query.token;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(pass, salt, async (err, pass) => {
        if (err) res.sendError("Error in encryption");
        else {
          var s = `UPDATE users SET password = ?, token = ? WHERE token = ?`;
          var newtoken = makeid();
          [error, result] = await to(db.query(s, [pass, newtoken, q]));
          if (error) return res.sendError(error);
          else return res.sendSuccess(null, "Password reset successful");
        }
      });
    });
  }
};
