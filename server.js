const express = require("express")
const connect = require('./config/db')
const login = require('./controllers/user.controller')
const cors = require('cors')


const app = express();
app.use(express.json());

app.use(cors())

app.use('/api',login)


app.listen(3001, async() =>{
    await connect();
    console.log("DB connected and running on port 3001");
})