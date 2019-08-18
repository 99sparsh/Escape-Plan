var express = require('express')
var router = express.Router()

router.get('/question', function(req,res){
    res.send({
        "Question": "What is the Capital of Canada?",
        "answer":"Ottawa",
        "hints":["It's not Toronto"]
    })
})

router.post('/answer', function(req,res){
    if(req.body["answer"] == "Ottawa"){
        res.send({
            "Message": "Correct Answer",
            "Points" : 10
        })
    }else{
        res.send({
            "Message": "Wrong Answer",
            "Points": 10
        })
    }
})