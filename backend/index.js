const db=require("./db");
const express = require("express");
const bodyParser = require('body-parser');
const jwt=require("jsonwebtoken");
const cors=require("cors");
const cookies=require("cookie-parser")
const backendroutes=require("./routes/backend.routes");
const app=express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Make sure to enable credentials
  }));
app.use(express.json());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookies());
const port=8000;

app.use('/api/v1',backendroutes);

app.listen(port,()=>{
    console.log(`server started on running port ${port}`);
})



