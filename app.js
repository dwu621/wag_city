const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const PORT = process.env.PORT || 3001   

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())


app.listen(PORT, () => console.log(`Wagcity Server Running On Port: ${PORT}`))