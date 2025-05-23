const Player = require('../models/player')

async function getAllPlayers() {
    return await Player.find();
}

async function getPlayerByNom(name) {
    return await Player.findOne({nom:name.toUpperCase()}).exec();
}

async function updatePlayerHp(name,hp){
    return await Player.findOneAndUpdate({nom:name}, {pv:hp}, { new: true });
}

module.exports = {
    getAllPlayers,
    getPlayerByNom,
    updatePlayerHp
}