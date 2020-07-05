const express=require('express');
const http=require('http');
const bodyParser=require('body-parser');
var Promotions = require('../models/promos');


const promoRouter=express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

.get((req,res,next)=>{

    Promotions.find({}, (err, promo)=> {
        if (err) throw err;
        res.json(promo);
    });
})

.post((req,res,next)=>{

    Promotions.create(req.body, (err, promo)=> {
        if (err) throw err;
        console.log('Promo!');
        var id = promo._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the promo with id: ' + id);
    });
})

.put((req,res,next)=>{

    res.statusCode=403;
    res.end('PUT not supported');
})

.delete((req,res,next)=>{
    
    Promotions.remove({},(err, resp)=>{
        if (err) throw err;
        res.json(resp);
    });
});

//promotions IDs


promoRouter.route('/:promotionID')

.get((req,res,next)=>{
    Promotions.findById(req.params.promotionID,(err, promo)=> {
        if (err) throw err;
        res.json(promo);
    });})

.post((req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promotionID, {
        $set: req.body
    }, {
        new: true
    },(err, promo)=> {
        if (err) throw err;
        res.json(promo);
    });
})

.put((req,res,next)=>{
   
    Promotions.findByIdAndRemove(req.params.promotionID,(err, resp) =>
    { if (err) throw err;
        res.json(resp);
    });
})

.delete((req,res,next)=>{
    
    Promotions.findByIdAndRemove(req.params.promotionID,(err, resp) =>
    {if (err) throw err;
        res.json(resp);
        
    });});


module.exports=promoRouter;
