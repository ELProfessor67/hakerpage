const express = require('express');
const { Server } = require('http');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:false}));


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

app.post('/chatroom',(req,res) => {
  const password = "Sha33n";
  if(req.body.pass == ""){
    return res.render('index',{error:"please enter password"});
  }else if(req.body.pass !== password){
    return res.render('index',{error:"invalid password"});
  }else if(req.body.pass == password){
    res.render('room');
  }
});

app.get('*',(req,res)=>{
    res.render('index');
});

// server listen
app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`);
});