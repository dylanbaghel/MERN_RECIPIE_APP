require('./config/config');

//THIRD PARTY MODULES
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
//BUILT IN MODULES

//CUSTOM MODULE FILES
const { mongoose } = require('./db/mongoose');
const recipies = require('./routes/recipies');
const users = require('./routes/users');
//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    exposedHeaders: ['Content-Length', 'x-auth']
}));
//Routes
app.get('/', (req, res) => {
    res.json({ result: "Working" });
});

//ROUTES SETUP
app.use('/users', users);
app.use('/recipies', recipies);

//MERN APP SETUP FOR PRODUCTION
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

//SERVER LISTENER
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Up At PORT ${process.env.PORT}`);
});

module.exports = { server };