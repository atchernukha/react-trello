const express = require('express')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT)