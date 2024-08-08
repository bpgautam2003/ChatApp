const express = require('express');
const {protectUser} = require("../middlewares/authMiddleware");
const { accessChat, fetchChats } = require('../controllers/chatController');

const router = express.Router();

router.route('/').post(protectUser, accessChat);
router.route('/').get(protectUser, fetchChats);

module.exports = router;