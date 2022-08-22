const router = require('express').Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware');
// const {GetTournaments, AddTournament} = require('../controllers/TournamentController');



// router.get('/:id?', AuthMiddleware,GetTournaments);
// router.post('/', AuthMiddleware,AddTournament);

module.exports = router;