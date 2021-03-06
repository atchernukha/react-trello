const express = require('express')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 8080

const app = express()

console.log("Fronend:")
app.use(cors())

app.use(express.static(path.resolve(__dirname, 'build')))

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')))

app.listen(PORT, () => console.log(`Frontend started on port ${PORT}`))