const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chat');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.send('LongMind Backend logic is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
