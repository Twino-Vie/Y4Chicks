const express= require('express');
const router = express.Router();
const chicksRequest = require ('../models/chicksRequest');//importing the model

//show req form
router.get('/chickrequest',(req,res) =>{
    res.render('chickStockReq');//name of the pug file
});

//post to the DB
router.post("/chickrequest", async (req, res) => {
  try {
    console.log(req.body); //Check what's being sent
    const newRequest = new chicksRequest(req.body); // Create new doc
    await newRequest.save(); // Save to DB
    res.status(201).send("Chick stock saved successfully."); //Respond to client
    
  } catch (error) {
    console.error(error); //Log actual error
    res.status(400).render("chickStockReq", { error: "Failed to save chick stock." }); // Or res.send for simple projects
  }


  

});




module.exports = router;