const express = require('express')
const router = express.Router()

const fruits = [
	{ name: 'apple', amount: 10 },
	{ name: 'banana', amount: 132 },
	{ name: 'orange', amount: 20 },
	{ name: 'blackberry', amount: 400 }
]

router.use((req, res, next) => {
	if (req.body.admin) {
		next()
	} else {
		const err = new Error('You are not authorized to access fruits')
		err.statusCode = 401
		next(err)
	}
})

router.get('/', (request, response, next) => {
	const searchLetter = request.query.firstLetter
	if (searchLetter) {
		const responseData = []
		for (let i = 0; i < fruits.length; i++) {
			const fruit = fruits[i];
			const firstLet = fruit.name.charAt(0)
			if (firstLet === searchLetter) {
				responseData.push(fruit)
			}
		}
		// console.log(responseData)
		return response.send(responseData)
	}
	// console.log(request.query)
	response.send(fruits)
})

const fruitChecker = (req, res, next) => {
	const { name, amount } = req.body

	const errors = []

	if (!name) {
		errors.push('Please provide a name for your fruit')
	}
	if (!amount || amount < 1) {
		errors.push('Please provide a valid amount (more than 0)')
	}

	if (errors.length > 0) {
		const err = new Error(errors)
		// console.log(err)
		err.statusCode = 400
		next(err)
	} else {
		next()
	}

}

const createFruit = (req, res) => {
	fruits.push(req.body)
	res.status(201)
	res.json(fruits)
}

router.post('/', [fruitChecker, createFruit])

router.get('/:fruitId(\\d+)', (req, res, next) => {
	if (req.params.fruitId > fruits.length - 1) {
		const err = new Error('The requested fruit could not be found')
		err.statusCode = 404
		next(err)
	}
	// console.log(req.params)
	res.json(fruits[req.params.fruitId])
})


module.exports = router;