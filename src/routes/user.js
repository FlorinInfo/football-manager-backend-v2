const router = require('express').Router();
const { User, Team, Tournament } = require("../db/sequelize");
const {GetUsers, UserRegistration,UserLogin,UserLogout, UserTokenRefresh, UserRegisterToTournament, UserUpdateAttack,UserUpdateDefense} = require('../controllers/UserController');
const {body} = require("express-validator");
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/', AuthMiddleware, GetUsers);
router.post(
    '/registration',
    body("email").isEmail(),
    body("password").isLength({min:3}),
    body("username").isLength({min:3}),
    UserRegistration
);
router.post('/login',UserLogin);
router.post('/logout',UserLogout);
router.get('/refresh',UserTokenRefresh);
router.post('/registerToTournament',AuthMiddleware,UserRegisterToTournament);
router.patch('/attack',AuthMiddleware,UserUpdateAttack);
router.patch('/defense',AuthMiddleware,UserUpdateDefense);

module.exports = router;