const express = require('express');
const router = express.Router();
const db = require('../config/conn');
const bcrypt = require('bcryptjs');
const to = require('../utils/to');
const validator = require('../utils/validator');

function makeid() { //for random string token
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 32; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  exports.register =  async(req,res)=>{
      console.log(req.body);
      let err,result,user;
      if(req.body.password!=req.body.password2)
        return res.sendError(null,"Passwords do not match");
      else{
        bcrypt.genSalt(10,(error,salt)=>{
            bcrypt.hash(req.body.password,salt,async (error,pass)=>{
                if(error)
                    return res.sendError(error)
                else{
                    var token=makeid()
                    var q = `INSERT INTO users (name,username,email,password,token,regno,phone) VALUES (?,?,?,?,?,?,?)`
                    [err,result] = await to(db.query(q,[req.body.name,req.body.username,req.body.email,pass,token,req.body.regno,req.body.phone]));
                    console.log(result);
                    console.log(err);
                    if(err)
                        return res.sendError(err);
                    return res.sendSuccess("Successfully Registered");
                }
            })
        })
    }
      
  };