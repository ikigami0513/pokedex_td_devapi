const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const {cors_policy} = require ('./middlewares/cors_policy');
const user_router = require('./routes/user');
const type_router = require('./routes/type');
const pokemon_router = require('./routes/pokemon');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/pokedex')
.then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

app.use(bodyParser.json());
app.use(cors_policy);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/user', user_router);
app.use('/api/type', type_router);
app.use('/api/pokemon', pokemon_router);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});