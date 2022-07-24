const router = require('express').Router();
const { User } = require("../db/sequelize");

router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;