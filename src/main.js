const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });




// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Importing routes
const productRoute = require('./routes/productRoutes');
const orderRoute = require('./routes/orderRoutes');
const commissionRoute = require('./routes/commissionRoutes');


// Route Middleware
app.use('/api/v1', productRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', commissionRoute);

//api/v1/products


app.get('/', (req, res) => {
    res.send('We are on home');
});

module.exports = app;
