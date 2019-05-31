const express = require('express');
const db = require('../config/conn');
const to = require('../utils/to');
const bcrypt = require('bcryptjs');

exports.home = async(req,res)=>{
    //console.log(req.user);
    let err,result,ob,hints;
    [err,result] = await to(db.query(`SELECT qno,body FROM questions WHERE qno = ?`,[req.user.current]));
    if(err)
        return res.sendError(err);
    [err,hints] = await to(db.query(`SELECT body FROM hints WHERE qid = ? AND visibility = ?`,[req.user.current,1]));
    if(err)
        return res.sendError(err);
    ob = result[0];
    ob.username = req.user.username;
    ob['hints']=hints;
    
    return res.sendSuccess(ob);
}

exports.submit = async(req,res)=>{
    let err,result,match,ob;
    [err,result] = await to(db.query(`SELECT answer from questions WHERE qno = ?`,[req.user.current]));
    if(err)
        return res.sendError(err);
    ans = result[0].answer;
    //console.log(ans);
    [err,match] = await to(bcrypt.compare(req.body.answer,ans));
    //console.log(match);

    if(err)
        return res.sendError(err);
    if(match){
        [err,result] = await to(db.query(`UPDATE users SET current = current+1 WHERE id = ?`,[req.user.id]));
        if(err)
            return res.sendError(err);
    console.log(result);
        
        
        req.user.current = req.user.current+1; //updating request user object

        [err,result] = await to(db.query(`SELECT qno,body,hint FROM questions WHERE qno = ?`,[req.user.current]));
        ob = result[0];
        ob.username = req.user.username;
        [err,result] = await to(db.query(`INSERT INTO submissions (verdict,uid,qno) VALUES (?,?,?)`,['correct',req.user.id,req.user.current-1]));
        if(err)
            return res.sendError(err);
        return res.sendSuccess(ob,"Solved");
    }
    else{
        [err,result] = await to(db.query(`INSERT INTO submissions (verdict,uid,qno) VALUES (?,?,?)`,['wrong',req.user.id,req.user.current]));
        if(err)
            return res.sendError(err);
        return res.sendSuccess(null,"Wrong Answer");
    }

};