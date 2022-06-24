const express = require('express');
const { Server } = require('http');
const app = express();
const path = require('path');


const port = process.env.PORT || 3000;

// set public path
const pubPath = path.join(__dirname,'public');
app.use(express.static(pubPath));

// set view engine
app.set('view engine','hbs');

// routing urls
app.get('/',(req,res)=>{
    res.render('index');
});

app.get('*',(req,res)=>{
    res.render('index');
});

// server listen
app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`);
});