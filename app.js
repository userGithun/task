const express = require('express')
const app = express()
const port = 3000
const web = require('./route/web')
const connectDB = require('./database/connectdb')




app.use(express.json())

//Database
connectDB()

//route load
app.use('/', web)
//server start
app.listen(port, () => {
    console.log(`server start localhost:${port}`)
})