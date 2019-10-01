const express = require("express");
const router = express.Router();
const db = require("../config/conn");
const bcrypt = require("bcryptjs");
const to = require("../utils/to");
const validator = require("../utils/validator");

exports.addQuestion = async (req, res) => {
  let err, result;
  [err, result] = await to(
    db.query(`SELECT *  FROM questions WHERE qno = ?`, [req.body.qno])
  );
  if (result.length != 0)
    return res.sendError(null, "Question number already exists");
  else {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(req.body.answer, salt, async (error, ans) => {
        if (error) return res.sendError(error);
        else {
          [err, result] = await to(
            db.query(
              `INSERT INTO questions (qno,body,answer,points) VALUES (?,?,?,?)`,
              [req.body.qno, req.body.body, ans, req.body.points]
            )
          );
          if (err) return res.sendError(err);
          else
            return res.sendSuccess(
              null,
              "Question " + req.body.qno + " Inserted"
            );
        }
      });
    });
  }
};

exports.addHint = async (req, res) => {
  let err, result;
  [err, result] = await to(
    db.query(`INSERT INTO hints (qid,body,visibility) VALUES (?,?,?)`, [
      req.body.qid,
      req.body.body,
      req.body.visibility
    ])
  );
  if (err) return res.sendError(err);
  return res.sendSuccess(null, "Hint Added for question " + req.body.qid);
};
