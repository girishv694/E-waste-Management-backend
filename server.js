// const express = require("express")
// const connect = require('./config/db')
// const login = require('./controllers/user.controller')
// const cors = require('cors')

// const ac = require('./controllers/Ac.controller')


// const app = express();
// app.use(express.json());

// app.use(cors())

// app.use('/api',login)
 
// app.use('/ac',ac);


// app.listen(3001, async() =>{
//     await connect();
//     console.log("DB connected and running on port 3001");
// })

////////////////////////////////////////////////////////////////////////

const mongoose = require('mongoose')
const express = require('express')
const connect = require('./config/db')
const app = express();
const user = require('./controllers/user.controller')
const cors = require('cors')
const category = require('./controllers/Category.controller')
app.use('/category',category)


app.use(express.json());
app.use(cors())

app.use("/user",user)




app.listen(3002, async() =>{
    await connect();
    console.log("DB connected and running on port 3002");
})

