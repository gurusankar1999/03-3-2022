const express=require("express");
const mysql=require("mysql2");
const app=express();
let port=3000;
app.use(express.json());

const db = mysql.createConnection({


    host:"localhost",
    user:"root",
    password:"",
    database:"motorbike",
    port:3306,


});

db.connect((err)=>{

     if(err){

        console.log(err,"error");
     }

        else{
             
            console.log("guru database");
        }

});


app.get("/:id",(req,res)=>{
    let id=req.params.id
    let qry='SELECT * FROM `twowheeler` WHERE bike_id="'+id+'"' 
     db.query(qry,(err,result)=>{
         if(err){

            console.log(err,"error");

        }

        if(result.length>0){
 
            res.send({status:true,msg:"my database",data:result})

        }
       
        else{
            res.send({status:false,msg:"falied"});
        }
    });

});

app.post("/add",(req,res)=>{
let name=req.body.name;
let engine_cc=req.body.engine_cc;
let rate=req.body.rate;
let weight=req.body.weight;
 
let qry= 'INSERT INTO `twowheeler`( `name`, `engine_cc`, `rate`, `weight`) VALUES ("'+name+'","'+engine_cc+'","'+rate+'","'+weight+'")';
 db.query(qry,(err,result)=>{
  
    if(err)
    {
       
        console.log(err);
    }
    console.log(result);
 if(result.affectedRows == 1)
     {
         res.send({status:true,msg:"my database",data:result})

     }


     else{
         res.send({status:false,msg:"falied"});
     }

    });
});

app.listen(port,()=>{
    console.log("the server is running");
});



