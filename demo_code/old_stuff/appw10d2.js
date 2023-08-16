const express = require('express')
const app = express()
require('dotenv').config()

const fruitsRouter = require('./routes/fruits')

app.use(express.json())

app.use('/fruits', fruitsRouter)

app.get('/inventory', (req, res) => {
	res.send(process.env.PASSWORD)
})

app.use((req, res, next) => {
	const err = new Error('Your request did not match any of our end points :(')
	err.statusCode = 404
	next(err)
})

app.use((err, req, res, next) => {
	const status = err.statusCode || 500

	res.status(status)
	res.json({
		message: err.message,
		statusCode: status,
		stack: err.stack
	})
})


app.listen(8000, () => console.log('Listening on port 8000...'))