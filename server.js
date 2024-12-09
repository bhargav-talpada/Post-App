const express = require('express');
const app = express()
require('dotenv').config()
const routing = require('./router/postRouter');
const userRouter = require('./router/userRouter')
const errorHandler = require('./middleware/ErrHandler')

const { connectDB } = require('./config/db');
connectDB();

app.use(express.json());
app.use('/api', routing);
app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.send('hello server')
})

app.use(errorHandler)

const port = process.env.PORT;
app.listen(port, err => {
    console.log(`Server running on ${port}`)
})