require('dotenv').config();
require('express-async-errors');

const { errorHandler } = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

const router = express.Router();

app.use('/', require('./routes/root'));
app.use('/students', require('./routes/studentRoutes'));
app.use('/tests', require('./routes/testRoutes'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});