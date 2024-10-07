const express = require("express");
const {Worker}= require("worker_threads");
const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking",(req,res)=>{
    res.status(200).send("this page is non-blocking");
})

app.get("/blocking",async(req,res)=>{
   const worker = new Worker("./worker.js");
   worker.on("message",(data)=>{
     res.status(200).send(`the result is ${data}`);
   })
   worker.on("error",(error)=>{
    res.status(404).send(`error ocurred ${error}`);
  })  
})

app.listen(port, () => {
    console.log(`server listening on port${port}`);
})