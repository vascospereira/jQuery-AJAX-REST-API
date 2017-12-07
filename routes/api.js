const express = require('express');
const router = express.Router();
const get = require('../helpers');
let {players, currentId} = require('../db');


router.get('/players', function (req, res) {
    res.send({players: players});
});

router.post('/players', function (req, res) {

    const playerName = req.body.name;

    if(playerName !== ""){
        players.push({
            id: ++currentId,
            name: get.wordsCase(playerName)
        });
        res.send('Successfully saved player!');
    }

});

router.put('/players/:id', function (req, res) {

    const id = req.params.id;
    const newName = req.body.newName;

    if(newName !== ""){
        players.forEach(function (player) {
            if (player.id === Number(id)) {
                player.name = get.wordsCase(newName);
            }
        });
        res.send('Successfully updated player!');
    }

});

router.delete('/players/:id', function (req, res) {
    const id = req.params.id;

    players.forEach(function (player, index) {
        if (player.id === Number(id)) {
            players.splice(index, 1);
        }
    });

    res.send('Successfully deleted player!');
});


module.exports = router;