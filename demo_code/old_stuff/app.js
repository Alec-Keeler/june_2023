const express = require('express')
const app = express()

app.use(express.json())

// serving static files in express
// how do we request static files? href=/css/index.css
// app.use(express.static('assets')) // /assets/css/index.css (effective file path) /css/index.css (actual request)
app.use('/stylesheets', express.static('assets/css')) // /stylesheets/index.css
app.use('/frontendDom', express.static('assets/scripts')) // /frontendDom/script.js
// app.use(express.static('assets/css')) // /index.css

app.use('/store', (req, res, next) => {
	console.log("Request path: ", req.path)
	console.log("Request body: ", req.body)
	next()
})

const fruits = [
	{name: 'apple', amount: 10},
	{name: 'banana', amount: 132},
	{name: 'orange', amount: 20},
	{name: 'blackberry', amount: 400}
]

app.use((req, res, next) => {
	const message = "Hello there"
	next(message)
})

app.use((err, req, res, next) => {
	next()
})

app.use((err, req, res, next) => {
	console.log('???????')
	next()
})

app.get('/fruits', (request, response, next) => {
	if (request.query.firstLetter) {
		const responseData = []
		for (let i = 0; i < fruits.length; i++) {
			const fruit = fruits[i];
			const firstLet = fruit.charAt(0)
			if (firstLet === request.query.firstLetter) {
				responseData.push(fruit)
			}
		}
		// console.log(responseData)
		return response.send(responseData)
	} else {
		const err = new Error('Please provide a first letter query string')
		next(err)
	}
	// console.log(request.query)
	// response.send(fruits)
})

// app.get('/fruits/*', (req, res) => { //we won't frequently be using *s in our paths
// 	res.send('The * can be used in express paths to match any text within its URL segment(s)')
// })
const fruitChecker = (req, res, next) => {
	const {name, amount} = req.body

	if (!name) {
		res.status(400)
		return res.json({message: 'Please provide a name for your fruit'})
	}
	if (!amount || amount < 1) {
		res.status(400)
		return res.json({message: 'Please provide a valid amount (more than 0)'})
	}

	next()
}

const createFruit = (req, res) => {
	fruits.push(req.body)
	res.status(201)
	res.json(fruits)
}
// app.use(fruitChecker)

app.post('/fruits', [fruitChecker, createFruit])

app.get('/fruits/shop', (req, res) => {
	res.send('All my shop fruits')
})

// /fruits/:id
// /fruits/1
app.get('/fruits/:fruitId', (req, res) => {
	console.log(req.params)
	res.json(fruits[req.params.fruitId])
})

app.get('/store/fruits/inventory', (req, res) => {
	console.log(req.path)
	res.send('This is the store inventory route')
})

// app.use((err, req, res, next) => {
// 	console.log(err)
// })


app.listen(8000, () => console.log('Listening on port 8000...'))