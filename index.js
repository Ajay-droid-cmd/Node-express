const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public/'));

app.all('/dishes',(req, res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app .get('/dishes',(req, res,next)=>{
    res.end('Will send all the dishes to you!');
});

app.post('/dishes',(req, res, next)=>{
  res.end('Will add dish :'+req.body.name + 'With details :'+req.body.description);
})

app.put('/dishes',(req, res, next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported in dishes');
})

app.delete('/dishes',(req, res, next)=>{
    res.end('Deleting all the dishes');
})

//Dish id routs 


app.all('/dishes/:dishId',(req, res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app .get('/dishes/:dishId',(req, res,next)=>{
    res.end('Will send the dish :'+req.params.dishId +  'to you!');
});

app.post('/dishes/:dishId',(req, res, next)=>{
  res.statusCode = 403;  
  res.end('Post operation not supported on dishes');
});

app.put('/dishes/:dishId',(req, res, next)=>{
    res.statusCode = 200;
    res.write('Updating the dish details :'+req.params.dishId +  '\n');
    
    res.end('Will update the dish: '+ req.body.name +  'With details: '+ req.body.description);
});

app.delete('/dishes/:dishId',(req, res, next)=>{
    res.end('Deleting the dishes'+ req.params.dishId);

});

app.use((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is Express</h1></body></html>');
})

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
})