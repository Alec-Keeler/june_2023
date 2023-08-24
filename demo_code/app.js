const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'pug')

const gamesRouter = require('./routers/games')
app.use('/games', gamesRouter)

app.get('/', (req, res) => {
	res.render('home.pug')
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))