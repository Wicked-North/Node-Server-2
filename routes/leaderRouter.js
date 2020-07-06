const express=require('express');
const http=require('http');
const bodyParser=require('body-parser');
var Leaders = require('../models/leaders');

const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());


leaderRouter.route('/')

.get((req, res, next)=> {
    Leaders.find({},(err, leader) =>{
        if (err) throw err;
        res.json(leader);
    });
})

.post((req, res, next)=> {
    Leaders.create(req.body,(err, leader) => {
        if (err) throw err;
        console.log('Dish created!');
        var id = leader._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the leader with id: ' + id);
    });
})

.delete((req, res, next)=> {
    Leaders.remove({},(err, resp)=>{
        if (err) throw err;
        res.json(resp);
    });
});
	
leaderRouter.route('/:leaderId')
.get((req, res, next)=> {
    Leaders.findById(req.params.leaderId,(err, leader) =>{
        if (err) throw err;
        res.json(leader);
    });
})

.put((req, res, next)=> {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.delete((req, res, next)=> {
    Leaders.findByIdAndRemove(req.params.leaderId,(err, resp)=>{        if (err) throw err;
        res.json(resp);
    });
});

module.exports=leaderRouter;
