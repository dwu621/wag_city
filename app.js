const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const AppRouter = require('./routes/AppRouter')
const AuthRouter = require('./routes/AuthRouter')

const PORT = process.env.PORT || 3001   


app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', AppRouter)
app.use('/auth', AuthRouter)


app.get('/', (req, res) => res.json({ message: 'Wagcity'}))


app.listen(PORT, () => console.log(`Wagcity Server Running On Port: ${PORT}`))