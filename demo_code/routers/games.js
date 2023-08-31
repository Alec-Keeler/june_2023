const express = require('express')
const router = express.Router()
const { Op } = require("sequelize");

// import models
const {Game, Review, User, Like, sequelize} = require('../db/models')

// find all games. SELECT only the games' names and categories. ORDER the results by name
// add pagination
	// route should take in page and size query strings
	// if no page or size values are provided, default to 1 and 5
	// if either page or size are provided but have values less than 1, respond with all non paginated results
		// will need to conditionally add pagination properties to query
router.get('/', async (req, res) => {
	let {size, page} = req.query
	if (!size && req.body.size) {
		size = req.body.size
	}

	if (!size) size = 5
	if (!page) page = 1
	let pagination = {}
	console.log(page, size)
	if (size >= 1 && page >= 1) {
		pagination.limit = size
		pagination.offset = (page - 1) * size
	}
	const games = await Game.findAll({
		attributes: ['id', 'name', 'category', 'minPlayers', 'maxPlayers'],
		order: [['name', 'DESC']],
		...pagination
	}) // SELECT * FROM Games ORDER BY name;

	const count = await Game.count()
	let numPages = count / size
	if (numPages === Infinity) {
		numPages = 0
	}
	
	// res.json(games)
	res.render('allgames.pug', {games, size, numPages})
})

// find a game using a name query string /games/search?name=x
// incorporate the LIKE operator
// Add additional optional search filters (query strings)
	// name, maxCost, reviewedByUser
	// find a game with the provided name
	// find games with a cost less than or equal to maxCost
	// find all games and reviews by specified user id
router.get('/search', async (req, res) => {
	const {name, maxCost, reviewedByUser} = req.query

	let queryObj = {
		where: {},
		include: []
	}

	if (name) {
		queryObj.where.name = {
			[Op.substring]: name
		}
	}

	if (maxCost) {
		queryObj.where.cost = {
			[Op.lte]: maxCost
		}
	}

	if (reviewedByUser) {
		queryObj.include.push({
			model: Review,
			where: {
				userId: reviewedByUser
			}
		})
	}


	const game = await Game.findAll(queryObj) // SELECT * FROM Games WHERE name = ?

	res.json(game)
})

// find a game by its primary key
router.get('/:id(\\d+)', async (req, res) => {
	const game = await Game.findByPk(req.params.id, {
		// attributes: ['name', 'maxPlayers']
	})

	// res.json(game)
	res.render('agame.pug', {game})
})

// build a new instance of a Game
router.post('/build', async (req, res) => {
	const {name, minPlayers, maxPlayers, category, cost, avgPlayTime, minAge} = req.body

	const newGame = Game.build({
		name,
		minPlayers,
		maxPlayers,
		category,
		cost,
		avgPlayTime,
		minAge
	})

	newGame.validate()

	await newGame.save()

	res.json({
		message: 'Successfully built a new game',
		game: newGame
	})
})

router.get('/newgame', (req, res) => {
	res.render('create-game.pug', {errors: [], body: {}})
})

// create a new instance of a Game
const gameChecker = (req, res, next) => {
	const { name, minPlayers, maxPlayers, category, cost, avgPlayTime, minAge } = req.body
	let errors = []
	if (!name) {
		errors.push('Please provide a valid name')
	}
	req.errors = errors
	next()
}
router.post('/create', gameChecker, async (req, res) => {
	const { name, minPlayers, maxPlayers, category, cost, avgPlayTime, minAge } = req.body

	if (req.errors.length > 0) {
		return res.render('create-game.pug', {errors: req.errors, body: req.body})
	}

	const newGame = await Game.create({
		name,
		minPlayers,
		maxPlayers,
		category,
		cost,
		avgPlayTime,
		minAge
	})

	res.json({
		message: 'Successfully create a new game',
		game: newGame
	})
})

// edit a game identified by its id
router.put('/:id', async (req, res) => {
	const game = await Game.findByPk(req.params.id)
	const { name, minPlayers, maxPlayers, category, cost, avgPlayTime, minAge } = req.body

	if (name) {
		game.name = name
	}
	if (minPlayers) {
		game.minPlayers = minPlayers
	}
	if (maxPlayers) {
		game.maxPlayers = maxPlayers
	}
	if (category) {
		game.category = category
	}
	if (cost) {
		game.cost = cost
	}
	if (minAge) {
		game.minAge = minAge
	}
	if (avgPlayTime) {
		game.avgPlayTime = avgPlayTime
	}
	await game.save()
	res.json({
		message: 'Successfully updated a game',
		data: game
	})
})

// delete a game identified by its id
router.delete('/:id', async (req, res) => {
	const game = await Game.findByPk(req.params.id)
	await game.destroy()
	res.json({
		message: `Deleted record with an id of ${req.params.id}`
	})
})

// find a game by its id and its associated reviews
router.get('/:id/reviews', async (req, res) => {
	const game = await Game.findByPk(req.params.id, {
		// include: Review
		// include: [Review, User]
		include: {
			model: Review,
			as: 'UserReviews'
			// attributes: ['rating', 'content'],
			// include: {
			// 	model: User,
			// 	attributes: ['username']
			// }
		},
		attributes: ['name', 'category']
	})

	// const user = await User.findByPk(2, {
	// 	include: {
	// 		model: Review,
	// 		through: {
	// 			attributes: []
	// 		}
	// 	}
	// })

	// const review = await Review.findByPk(2, {
	// 	include: {
	// 		model: User,
	// 		as: 'UserLikes'
	// 	}
	// })

	// const review = await Review.findByPk(3, {
	// 	// include: User
	// })
	// const game = await review.getGame()

	res.json({game})
})


// create a review for a game specified by id
router.post('/:id/reviews', async(req, res) => {
	// await Review.create({})
	const {rating, complexity, content, userId} = req.body
	const game = await Game.findByPk(req.params.id)

	const review = await game.createReview({
		rating, complexity, content, userId
	})

	res.json(review)
})

// Add likes for a user specified by id for reviews indicated in req.body
// req.body = {reviewIds: [...]}
router.post('/:userId/addlikes', async(req, res) => {
	const user = await User.findByPk(req.params.userId)

	await user.addReviews(req.body.reviewIds)

	res.json("success?")
})


// calculate the total number of games
// calculate the highest cost game
// calculate the game with the lowest average play time
// calculate the total cost of all games
// calculate the average cost of a game
// find the game specified by id, and add the above aggregate 
	// data to the game object to send in the response
router.get('/:id/agg', async(req, res) => {
	const totalNumGames = await Game.count()
	// const totalNumGames = await Game.findAll().length

	const highestCost = await Game.max('cost')

	const lowestAvgPlayTime = await Game.min('avgPlayTime')

	const totalCost = await Game.sum('cost')

	const avgGameCost = totalCost / totalNumGames

	const game = await Game.findByPk(req.params.id)
	const gameObj = game.toJSON()
	gameObj.totalGames = totalNumGames
	gameObj.highestCost = highestCost
	gameObj.lowestAvgPlayTime = lowestAvgPlayTime
	gameObj.totalCost = totalCost
	gameObj.avgGameCost = avgGameCost
	// console.log(game)

	res.json(gameObj)
})

// Use a scope to remove game time stamps by default
// Use a scope to find all games with a minPlayers value of 2 or less
// Use a scope to find the favorite game of a user identified by their name
	// /scopes?name=XYZ
router.get('/scopes', async(req, res) => {
	const games = await Game.scope(['defaultScope', {
		method: ['findFaveGame', req.query.name]
	}]).findAll()

	res.json(games)
})

module.exports = router;