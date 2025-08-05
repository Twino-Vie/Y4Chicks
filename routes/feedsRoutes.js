const express = require('express');
const router = express.Router();
const feedsModel = require("../models/feedsModel"); //feed requests
const FeedStock = require('../models/FeedStock');       // Feed inventory


// Show the feeds request form
router.get('/feedsrequest', (req, res) => {
    res.render('feedsReq'); // Use the correct Pug file name
});

// Handle POST request to /feedsrequest when the form is submitted
router.post('/feedsrequest', async (req, res) => {
  try {
    const { farmerName, farmerPhone, feedType, quantity, paymentMethod, requestDate } = req.body;

    const unitCost = 100000;
    const totalCost = quantity * unitCost;

    const newOrder = new feedsModel({
      farmerName,
      farmerPhone,
      feedType,
      quantity,
      unitCost,
      totalCost,
      paymentMethod,
      requestDate
    });

    await newOrder.save();
    req.flash('success', 'Feed order submitted successfully.');
    res.redirect('/feedstock');
  } catch (err) {
    console.error("Error saving feed order:", err.message);
    req.flash('error', 'Failed to submit order.');
    res.redirect('/feedstock');
  }
});


// View feed stock and orders
router.get('/feedstock', async (req, res) => {
  try {
    const feedStock = await FeedStock.find().lean();
    const feedRequests = await feedsModel.find().lean();

    res.render('feedStock', {
      feedStock,
      feedRequests,
      message: req.flash('success'),
      error: req.flash('error')
    });
  } catch (err) {
    console.error("Error loading feed stock view:", err.message);
    req.flash('error', 'Failed to load feed data.');
    res.redirect('/');
  }
});

//Post -Update Order Status
router.post('/update-order-status/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Approved', 'Cancelled'].includes(status)) {
      req.flash('error', 'Invalid status.');
      return res.redirect('/feedstock');
    }

    await feedsModel.findByIdAndUpdate(req.params.id, { status });
    req.flash('success', 'Order status updated.');
    res.redirect('/feedstock');
  } catch (err) {
    console.error("Order status update error:", err.message);
    req.flash('error', 'Failed to update status.');
    res.redirect('/feedstock');
  }
});

//POST route to update feed stock quantity from form submission
router.post('/update-feed-stock', async (req, res) => {
  try {
    const { feedType, quantity } = req.body;

    // Validate quantity - ensure it's a number and non-negative (optional)
    const qty = Number(quantity);
    if (isNaN(qty) || qty < 0) {
      return res.status(400).send('Invalid quantity provided.');
    }

    const stock = await FeedStock.findOneAndUpdate(
      { feedType },
      { quantity: qty },
      { new: true }
    );

    if (!stock) {
      return res.status(404).send('Feed not found.');
    }

    // After successful update, you can redirect back to the feedstock page
    res.redirect('/feedstock');
  } catch (err) {
    console.error('Feed stock update error:', err.message);
    res.status(500).send('Failed to update stock.');
  }
});

module.exports = router;

