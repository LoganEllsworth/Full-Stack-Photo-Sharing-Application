const Router = require('express');
const UserController = require('./controllers/userController');

const router = Router();

router.get('/', UserController.getUser);
router.get('/:id', UserController.getUserById);
router.post('/register', UserController.createUser);
router.post('/login', UserController.login);

module.exports = router;