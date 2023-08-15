const express = require('express')
const app = express()

app.use(express.json())

const fruits = ['apple', 'banana', 'orange', 'blackberry']



app.get('/fruits', (request, response) => {
	if (request.query.firstLetter) {
		const responseData = []
		for (let i = 0; i < fruits.length; i++) {
			const fruit = fruits[i];
			const firstLet = fruit.charAt(0)
			if (firstLet === request.query.firstLetter) {
				responseData.push(fruit)
			}
		}
		console.log(responseData)
		return response.send(responseData)
	} 
	console.log(request.query)
	response.send(fruits)
})

// app.get('/fruits/*', (req, res) => { //we won't frequently be using *s in our paths
// 	res.send('The * can be used in express paths to match any text within its URL segment(s)')
// })

app.post('/fruits', (req, res) => {
	fruits.push(req.body.fruit)
	res.status(201)
	res.json(fruits)
})

app.get('/fruits/shop', (req, res) => {
	res.send('All my shop fruits')
})

// /fruits/:id
// /fruits/1
app.get('/fruits/:fruitId', (req, res) => {
	console.log(req.params)
	res.json(fruits[req.params.fruitId])
})



app.listen(8000, () => console.log('Listening on port 8000...'))