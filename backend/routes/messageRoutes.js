const express = require('express');
const {protectUser} = require('../middlewares/authMiddleware');
const router = express.Router();
const {sendMessage} = require('../controllers/messageController')
const {allMessages} = require('../controllers/messageController')

router.route('/').post(protectUser, sendMessage)
router.route('/:chatId').get(protectUser, allMessages)

module.exports = router;