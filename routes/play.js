const express = require('express');
const db = require('../config/conn');
const to = require('../utils/to');
const bcrypt = require('bcryptjs');

exports.showQuestion = async(req,res)=>{
    let err,result,ob,hints;
    [err,result] = await to(db.query(`SELECT qno,body,visibility FROM questions WHERE qno = ?`,[req.params.id]));
    if(err)
        return res.sendError(err);
    if(result[0]['visibility']==0)
        return res.sendError(null,"This question is not available yet!");

    [err,hints] = await to(db.query(`SELECT body FROM hints WHERE qid = ? AND visibility = ?`,[req.params.id,1]));
    if(err)
        return res.sendError(err);

    ob = result[0];
    ob.username = req.user.username;
    ob['hints']=hints;

    return res.sendSuccess(ob,"Question "+req.params.id+" available");
};

exports.submit = async(req,res)=>{
    let err,result,match,ob;
    [err,result] = await to(db.query(`SELECT * FROM submissions WHERE verdict=? AND uid=? AND qno=?`,['correct',req.user.id,req.query.id]));
    if(err)
        return res.sendError(err);
    if(result.length!=0)
        return res.sendError(null,"You have already solved this question!");
    [err,result] = await to(db.query(`SELECT answer,points FROM questions WHERE qno = ?`,[req.query.id]));
    if(err)
        return res.sendError(err);
    ans = result[0].answer;
    [err,match] = await to(bcrypt.compare(req.body.answer,ans));
    if(err)
        return res.sendError(err);
    if(match){

        [err,result] = await to(db.query(`UPDATE users SET score = score + ? WHERE id = ?`,[result[0].points, req.user.id]));
        if(err)
            return res.sendError(err);
    
        [err,result] = await to(db.query(`INSERT INTO submissions (verdict,uid,qno) VALUES (?,?,?)`,['correct',req.user.id,req.query.id]));
        if(err)
            return res.sendError(err);
        return res.sendSuccess(null,"Solved");
    }
    else{
        [err,result] = await to(db.query(`INSERT INTO submissions (verdict,uid,qno) VALUES (?,?,?)`,['wrong',req.user.id,req.query.id]));
        if(err)
            return res.sendError(err);
        return res.sendSuccess(null,"Wrong Answer");
    }

};

exports.rank = async(req,res) =>{
    let err,result;
    [err,result] = await to(db.query(`SELECT 
        (SELECT COUNT(*) FROM users WHERE score>=x.score) AS rank
        FROM 
            users x  
        WHERE x.id = ?`,[req.user.id]));
        if(err)
            return res.sendError(err);
        return res.sendSuccess(result[0]);

};