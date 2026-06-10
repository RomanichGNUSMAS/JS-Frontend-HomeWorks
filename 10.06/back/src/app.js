const express = require('express');
const { prisma } = require('./configs/db');
const { errorHandle } = require('./middlewares/error.middleware');
const { userRouter } = require('./routes/user.route');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())
app.use('/users',userRouter)

app.use(errorHandle)

exports.app = app;