const express = require("express");
const { getAllPlayers, getPlayerByNom, updatePlayerHp } = require("../services/playersService");
const router = express.Router();

router.get('/', async (req,res) => {
  try {
    getAllPlayers().then(players => res.json(players));
  } catch (e){
    res.json({message: e.message});
  }
});

router.get('/:nom', async (req,res) => {
  try {
    getPlayerByNom(req.params.nom).then(player => res.json(player));
  } catch (e){
    res.json({message: e.message});
  }
});

router.patch('/:nom', async (req,res) => {
  try {
    res.json(await updatePlayerHp(req.params.nom, req.body.pv));
  } catch (e) {
    res.json({message: e.message});
  }
});

module.exports = router;