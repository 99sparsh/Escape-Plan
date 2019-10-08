const express = require("express");
const db = require("../config/conn");
const to = require("../utils/to");
const bcrypt = require("bcryptjs");

exports.showQuestion = async (req, res) => {
  let err,
    result,
    ob,
    hints,
    depends,
    i,
    dependencies = [];
  [err, result] = await to(
    db.query(`SELECT qno,body,visibility FROM questions WHERE qno = ?`, [
      req.params.id
    ])
  );
  if (err) return res.sendError(err);
  if (result[0]["visibility"] == 0)
    return res.sendError(null, "This question is not available yet!");

  [err, depends] = await to(
    db.query(`SELECT depends_on FROM dependencies WHERE qno = ?`, [
      req.params.id
    ])
  ); //retrieve dependencies
  if (err) return res.sendError(err);

  if (depends.length != 0) {
    //dependencies exist
    for (i = 0; i < depends.length; i++)
      dependencies.push(depends[i]["depends_on"]);
    if (dependencies.length == 1) dependencies.push(-1);

    [err, depends] = await to(
      db.query(
        `SELECT * from submissions WHERE verdict=? AND uid=? and qno in (?,?)`,
        ["correct", req.user.id, dependencies[0], dependencies[1]]
      )
    );
    if (err) return res.sendError(err);
    if (depends.length == 0)
      return res.sendError(
        null,
        "You need to solve previous questions to view this question!"
      );
  }

  [err, hints] = await to(
    db.query(`SELECT body FROM hints WHERE qid = ? AND visibility = ?`, [
      req.params.id,
      1
    ])
  );
  if (err) return res.sendError(err);

  ob = result[0];
  ob.username = req.user.username;
  ob["hints"] = hints;

  return res.sendSuccess(ob, "Question " + req.params.id + " available");
};

exports.submit = async (req, res) => {
  let err, result, match, ob, err2, result2, err3, result3;

  [err, result] = await to(
    db.query(`SELECT * FROM submissions WHERE verdict=? AND uid=? AND qno=?`, [
      "correct",
      req.user.id,
      req.query.id
    ])
  );
  if (err) return res.sendError(err);
  if (result.length != 0)
    return res.sendError(null, "You have already solved this question!");
  [err, result] = await to(
    db.query(`SELECT answer,points FROM questions WHERE qno = ?`, [
      req.query.id
    ])
  );
  if (err) return res.sendError(err);
  ans = result[0].answer;
  [err, match] = await to(bcrypt.compare(req.body.answer, ans));
  if (err) return res.sendError(err);
  if (match) {
    [err, result] = await to(
      db.query(`UPDATE users SET score = score + ? WHERE id = ?`, [
        result[0].points,
        req.user.id
      ])
    );
    if (err) return res.sendError(err);

    [err, result] = await to(
      db.query(`INSERT INTO submissions (verdict,uid,qno) VALUES (?,?,?)`, [
        "correct",
        req.user.id,
        req.query.id
      ])
    );

    [err3, result3] = await to(
      db.query(
        `SELECT completed
     FROM users 
     where id=?`,
        [req.user.id]
      )
    );

    if (result3[0].completed == 0) {
      //check if all questions solved
      [err, result] = await to(
        db.query(
          `SELECT count(*) as count FROM submissions
       WHERE verdict = ? and uid = ?`,
          ["correct", req.user.id]
        )
      );

      if (result[0].count == 31) {
        [err2, result2] = await to(
          db.query(
            `UPDATE users
             SET score = score + 50,
              completed = 1
              where id = ?`,
            [req.user.id]
          )
        );
        if (err2) return res.sendError(err2);
      }
      if (err3) return res.sendError(err3);
    }

    if (err) return res.sendError(err);
    return res.sendSuccess(null, "Solved");
  } else {
    [err, result] = await to(
      db.query(`INSERT INTO submissions (verdict,uid,qno) VALUES (?,?,?)`, [
        "wrong",
        req.user.id,
        req.query.id
      ])
    );
    if (err) return res.sendError(err);
    return res.sendSuccess(null, "Wrong Answer");
  }
};

exports.rank = async (req, res) => {
  let err, result, sendUser;
  [err, result] = await to(
    db.query(
      `SELECT 
        (SELECT COUNT(*) FROM users WHERE score>=x.score) AS rank
        FROM 
            users x  
        WHERE x.id = ?`,
      [req.user.id]
    )
  );
  if (err) return res.sendError(err);
  return res.sendSuccess(result[0]);
};

exports.colors = async (req, res) => {
  let err,
    result,
    i,
    solved = [],
    invisible = [],
    visible = [],
    colors = {};
  [err, result] = await to(
    db.query(`SELECT DISTINCT qno FROM submissions WHERE verdict=? AND uid=?`, [
      "correct",
      req.user.id
    ])
  );
  if (err) return res.sendError(err);
  for (i = 0; i < result.length; i++) solved.push(result[i]["qno"]);
  [err, result] = await to(
    db.query(`SELECT qno FROM questions WHERE visibility=0`)
  );
  if (err) return res.sendError(err);
  for (i = 0; i < result.length; i++) invisible.push(result[i]["qno"]);
  for (i = 1; i <= 31; i++) {
    if (
      solved.findIndex(x => {
        return x == i;
      }) == -1 &&
      invisible.findIndex(x => {
        return x == i;
      }) == -1
    )
      visible.push(i);
  }
  colors["solved"] = solved;
  colors["invisible"] = invisible;
  colors["visible"] = visible;
  return res.sendSuccess(colors);
};
