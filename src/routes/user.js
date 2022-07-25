const router = require('express').Router();
const { User, Team } = require("../db/sequelize");
const {getUsers} = require('../controllers/UserController');

router.get("/", async (req, res) => {
    try {
       const team = await Team.create({
            name:"xxxx",
        });

       const user = await User.create({
           username:"xxeee",
           email:"isf@mail.com",
           password:"123456",
       });
        await team.addUser(user, {through: 'Team_Players'});
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;