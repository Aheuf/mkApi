const express = require("express");
const Player = require('../models/player')
const router = express.Router();

router.get('/', async (req,res) => {
  try {
    res.json(await Player.find());
  } catch (e){
    res.json({message: e.message})
  }
});

router.get('/:nom', async (req,res) => {
  try {
    const nom = req.params.nom.toUpperCase();
    res.json(await Player.findOne({nom:nom}).exec())
  } catch (e){
    res.json({message: e.message})
  }
});

router.patch('/:nom', async (req,res) => {
  try {
    const nom = req.params.nom.toUpperCase();
    res.json(await Player.findOneAndUpdate({nom:nom}, {pv:req.body.pv}, { new: true }))
  } catch (e) {
    res.json({message: e.message})
  }
});

module.exports = router;