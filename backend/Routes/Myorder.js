
const express = require("express");
const router = express.Router();
const order=require('../model/Order');




router.post('/myOrderdata', async (req, res) => {
    try {
        const mydata = await order.findOne({ email: req.body.email });
     
        res.json({ mydata }).send;
     
        
      
    } catch (error) {
      console.error('Server Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;

