
const express = require("express");
const router = express.Router();
const order=require('../model/Order');


router.post("/orderData", async(req, res) => {
 let data=req.body.order_data;
 await data.splice(0,0,{order_date:req.body.order_date});
 let eid=await order.findOne({'email':req.body.email});
 console.log(eid);

 if (eid==null) {
    try{
        await order.create({
            email:req.body.email,
            order_data:[data]
        }).then(()=>{
            res.json({success:true})
        })
    }

    catch(error){
        console.log(error.message);
        res.status("server error").send(error.message)
    }
 }


 else{
    try{
        await order.findOneAndUpdate({email: req.body.email},{$push:{order_data:data}}).then(()=>{
            res.json({success:true})
        })
    }

    catch(error){
       res.send("server error", error.message) 
    }
 }
  
});

  
module.exports = router;
