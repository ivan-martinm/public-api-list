require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.SERVER_PORT;
const mongoose = require('mongoose');

const apisRouter = require('./controllers/apis');
const categoriesRouter = require('./controllers/categories');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(console.log);

app.use(cors());
app.use(express.json());

app.use('/public-api', apisRouter);
app.use('/public-api/categories', categoriesRouter);

app.listen(port, () => {
    console.log(`Listening port on ${port}`);
});