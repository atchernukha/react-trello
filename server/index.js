require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const path = require('path')
const cors = require('cors')
const router =require('./routes/index')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json())
app.use('/api', router)
app.get("/*", (req, res) => {res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));  })

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();