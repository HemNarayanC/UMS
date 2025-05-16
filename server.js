require('dotenv').config();
require('./config/dbConnection');
const userRouter = require('./routes/userRoute');

const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/api', userRouter);

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