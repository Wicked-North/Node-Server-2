const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const Dishes=require('../models/dishes');

const dishRouter=express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')

.get((req,res,next)=>{

    Dishes.find({})
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    })
    .catch((err)=>next(err));

})

.post((req,res,next)=>{

    Dishes.create(req.body)
    .then((dish)=>{
        console.log('Dish cerated', dish);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    })
    .catch((err)=>next(err));

})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT not suppported');    
})

.delete((req,res,next)=>{

    Dishes.deleteMany({})
    .then((resp)=>{

        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    })
    .catch((err)=>next(err));

});

//ADDING IDs

dishRouter.route('/:dishID')


.get((req,res,next)=>{

    Dishes.findById(req.params.dishID)
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    })
    .catch((err)=>next(err));

})

.post((req,res,next)=>{
    res.end('POST not supported on dishes/'+req.params.dishID);

})

.put((req,res,next)=>{
   
    Dishes.findByIdAndUpdate(req.params.dishID,{
        $set:req.body
    },{
        new:true
    })
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    })
    .catch((err)=>next(err));
})

.delete((req,res,next)=>{

    Dishes.findByIdAndDelete(req.params.dishID)
    .then((resp)=>{

        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    })
    .catch((err)=>next(err));
    

});




module.exports=dishRouter;