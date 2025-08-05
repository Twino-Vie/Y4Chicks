const express= require('express');
const router = express.Router();
const customerRegModel = require ('../models/customerRegModel');//importing the model

//show reg form
router.get('/customerReg',(req,res) =>{
    res.render('customerReg');//name of the pug file
});

//post to the DB
router.post("/customerReg", async (req, res) => {
  try {
    console.log(req.body); //Check what's being sent
    const newRequest = new customerRegModel(req.body); // Create new doc
    await newRequest.save(); // Save to DB
    res.status(201).send("You've been Registered successfully."); //Respond to client
    
  } catch (error) {
    console.error(error); //Log actual error
    res.status(400).render("customerReg", { error: "Registration Failed, Try Again." }); // Or res.send for simple projects
  }
});

module.exports = router;