const router = require('express').Router();
const {body} = require("express-validator");
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const { AddLocation, DeleteLocation, UpdateLocation, GetLocations} = require('../controllers/LocationController');

//Upload image middleware
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/locations');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({
    storage: storage,
});



router.get('/',AuthMiddleware,GetLocations);
router.post('/', [AuthMiddleware, upload.single("locationImage")],AddLocation);
router.delete('/',AuthMiddleware,DeleteLocation);
router.patch('/',AuthMiddleware, UpdateLocation);


module.exports = router;