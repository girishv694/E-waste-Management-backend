const express = require("express")
const connect = require('./config/db')
const login = require('./controllers/user.controller')
const productController = require('./controllers/product.controller')

const cors = require('cors')
const category = require('./controllers/Category.controller')
const ac = require('./controllers/Ac.controller')


const app = express();
app.use(express.json());

app.use(cors())

app.use('/api',login)
app.use('/products', productController)
app.use('/category',category)
app.use('/ac',ac);


app.listen(3001, async() =>{
    await connect();
    console.log("DB connected and running on port 3001");
})