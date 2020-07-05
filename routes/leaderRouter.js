const express=require('express');
const http=require('http');
const bodyParser=require('body-parser');

const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.all((req,res,next)=>{

    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{

    res.end('The leader will be notified');
})

.post((req,res,next)=>{

    res.end('The leader will be added : '+req.body.name+' and message will be added as: '+req.body.description);
})

.put((req,res,next)=>{

    res.statusCode=403;
    res.end('PUT not supported');
})

.delete((req,res,next)=>{
    
    res.end('Deleted the leader from the WORLD!');
});

//LEADER IDs


leaderRouter.route('/:leaderID')

.get((req,res,next)=>{
    res.end('We will be giving Ruski leaderes with id: '+req.params.leaderID);
})

.post((req,res,next)=>{
    res.end('POST not supported on leaders/'+req.params.leaderID);

})

.put((req,res,next)=>{
   
    res.write('updating the leader requested: '+req.params.leaderID+'\n');
    res.end('Will update leader: '+req.body.name+' with the details: '+req.body.description);    
})

.delete((req,res,next)=>{
    res.end('Deleting leader: '+req.params.leaderID );//DANGER!!!!
});


module.exports=leaderRouter;
