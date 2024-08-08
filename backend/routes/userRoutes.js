const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userController');

const {protectUser} = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', authUser)
router.get('/', protectUser, allUsers)

module.exports = router;