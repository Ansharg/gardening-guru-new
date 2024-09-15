const express = require('express');
const router = express.Router();
const {DisplayAllPlants,AddPlant,DeletePlant,startGrowing} = require('../controller/Plant');

router.get('/displayplants',DisplayAllPlants);
router.post('/addplant',AddPlant);
router.post('/deleteplant/:index',DeletePlant);
router.post('/startgrowing/:index',startGrowing);

module.exports = router;