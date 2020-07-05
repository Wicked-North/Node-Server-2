const express=require('express');
const http=require('http');
const bodyParser=require('body-parser');

const promoRouter=express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

.all((req,res,next)=>{

    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{

    res.end('The promotions will be notified');
})

.post((req,res,next)=>{

    res.end('The promotions will be added : '+req.body.name+' and message will be added as: '+req.body.description);
})

.put((req,res,next)=>{

    res.statusCode=403;
    res.end('PUT not supported');
})

.delete((req,res,next)=>{
    
    res.end('Deleted the promotions from the WORLD!');
});

//promotions IDs


promoRouter.route('/:promotionsID')

.get((req,res,next)=>{
    res.end('We will be giving Ruski promotionses with id: '+req.params.promotionsID);
})

.post((req,res,next)=>{
    res.end('POST not supported on promotionss/'+req.params.promotionsID);

})

.put((req,res,next)=>{
   
    res.write('updating the promotions requested: '+req.params.promotionsID+'\n');
    res.end('Will update promotions: '+req.body.name+' with the details: '+req.body.description);    
})

.delete((req,res,next)=>{
    res.end('Deleting promotions: '+req.params.promotionsID );//DANGER!!!!
});


module.exports=promoRouter;
