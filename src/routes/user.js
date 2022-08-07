const router = require('express').Router();
const { User, Team, Tournament } = require("../db/sequelize");
const {GetUsers, UserRegistration,UserLogin,UserLogout, UserTokenRefresh} = require('../controllers/UserController');
const {body} = require("express-validator");
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get("/xxx", async (req, res) => {
    try {
       const team = await Team.create({
            name:"xxxx",
        });

       const user = await User.create({
           username:"llll",
           email:"isf@mail.com",
           password:"123456",
       });
       await team.addUser(user, {through: 'Team_Players'});

       const tournament = await Tournament.create({
           numberOfPlayers:3,
           price:10,
           description:"100",

       })
        tournament.setUser(user);
        tournament.addUser(user);
        const users = await User.findAll();
        // await tournament.setUser(users[0]);


        res.status(200).send(users);
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});


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



module.exports = router;