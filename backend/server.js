const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const app = express();

const port = process.env.PORT;

const chats = require('../backend/data/data');

app.get('/', (req, res) => {
    res.send('API is running');

})

app.get('/api/chat', (req, res) => {
    res.send(chats);

})
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})