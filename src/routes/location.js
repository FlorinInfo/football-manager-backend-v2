const router = require('express').Router();
const {body} = require("express-validator");
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const { AddLocation, DeleteLocation, UpdateLocation, GetLocations} = require('../controllers/LocationController');

router.get('/',AuthMiddleware,GetLocations);
router.post('/',AuthMiddleware,AddLocation);
router.delete('/',AuthMiddleware,DeleteLocation);
router.put('/',AuthMiddleware, UpdateLocation);


module.exports = router;