const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const Dishes=require('../models/dishes');

const dishRouter=express.Router();

dishRouter.use(bodyParser.json());

//DISHES ROUTE

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

//DISH ID ROUTE

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


//DISH COMMENT ROUTE


dishRouter.route('/:dishID/comments')

.get((req,res,next)=>{

    Dishes.findById(req.params.dishID)
    .then((dish)=>{

        if(dish!=null){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments);
        }
        else{
            err = new Error('Dish with id '+req.params.dishID+' doesnot exist');
            err.statusCode=404;
            return next(err);
        }
        
    })
    .catch((err)=>next(err));

})

.post((req,res,next)=>{

    Dishes.findById(req.params.dishID)
    .then((dish)=>{
        if(dish!=null){
           
            dish.comments.push(req.body);
            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            })
            
        }
        else{
            err = new Error('Dish with id '+req.params.dishID+' doesnot exist');
            err.statusCode=404;
            return next(err);
        }
        
    })
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT not suppported');    
})

.delete((req,res,next)=>{

    Dishes.findById(req.params.dishID)
    .then((dish)=>{

        if(dish!=null){
            for(var i=(dish.comments.length -1);i>=0;i--){
                dish.comments.id(dish.comments[i].__id).remove();
            }
                
                dish.save()
                .then((dish)=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.json(dish);
                })
                
            }
            else{
                err = new Error('Dish with id '+req.params.dishID+' doesnot exist');
                err.statusCode=404;
                return next(err);
            }
            
    })
    .catch((err)=>next(err));

});

//DISH COMMENT ID ROUTE


dishRouter.route('/:dishID/comments/:commentID')


.get((req,res,next)=>{

    Dishes.findById(req.params.dishID)
    .then((dish)=>{
        if(dish!=null && dish.comments.id(req.params.commentID)!=null){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments.id(req.params.commentID));
        }
        else if(dish==null){
            err = new Error('Dish with id '+req.params.dishID+' doesnot exist');
            err.statusCode=404;
            return next(err);
        }
        else{

            err = new Error('Comments '+req.params.commentID+' doesnot exist');
            err.statusCode=404;
            return next(err);
        }
        
    })
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    res.end('POST not supported on dishes/'+req.params.dishID);

})

.put((req,res,next)=>{
   
    Dishes.findById(req.params.dishID)
    .then((dish)=>{
        if(dish!=null && dish.comments.id(req.params.commentID)!=null){

            if(req.body.rating){
                dish.comments.id(req.params.commentID).rating=req.body.rating;
            }

            if(req.body.comment){
                dish.comments.id(req.params.commentID).comment=req.body.comment;//comment is the JSON field

            }   //comments is the route

            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish.comments.id(req.params.commentID));
            })
        }
        else if(dish==null){
            err = new Error('Dish with id '+req.params.dishID+' doesnot exist');
            err.statusCode=404;
            return next(err);
        }
        else{

            err = new Error('Comments '+req.params.commentID+' doesnot exist');
            err.statusCode=404;
            return next(err);
        }
        
    })
    .catch((err)=>next(err));
})

.delete((req,res,next)=>{

Dishes.findById(req.params.dishID)
    .then((dish)=>{

        if(dish!=null && dish.comments.id(req.params.commentID)!=null){
          
                dish.comments.id(req.params.commentID).remove();
            
                
                dish.save()
                .then((dish)=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.json(dish);
                })
                
            }
            else if(dish==null){
                err = new Error('Dish with id '+req.params.dishID+' doesnot exist');
                err.statusCode=404;
                return next(err);
            }
            else{
    
                err = new Error('Comments '+req.params.commentID+' doesnot exist');
                err.statusCode=404;
                return next(err);
            }
    })
    .catch((err)=>next(err));
    
    

});





module.exports=dishRouter;