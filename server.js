require('dotenv').config();
require('./config/dbConnection');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

//error handling
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});