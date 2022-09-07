const router = require('express').Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const {AddTeam, AddUser} = require('../controllers/TeamController');
// const {GetTournaments, AddTournament} = require('../controllers/TournamentController');

router.post('/', AuthMiddleware, AddTeam);
router.post('/add-user', AuthMiddleware, AddUser);


module.exports = router;