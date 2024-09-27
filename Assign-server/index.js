const mysql=require('mysql');
const express=require("express");
const cors =require('cors');


const config=require('config');
const taksRoutes = require('./routes/tasks');



const PORT = config.get("port");
const app= express();
app.use(cors());
app.use(express.json());



app.use("/tasks",taksRoutes);

app.listen(PORT,()=>{console.log("Server started listening...")})   