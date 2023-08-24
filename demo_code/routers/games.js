const express = require('express')
const router = express.Router()
const { Op } = require("sequelize");

// import models
const {Game, Review, User, Like} = require('../db/models')

// find all games. SELECT only the games' names and categories. ORDER the results by name
router.get('/', async (req, res) => {
	const games = await Game.findAll({
		attributes: ['id', 'name', 'category', 'minPlayers', 'maxPlayers'],
		order: [['name', 'DESC']]
	}) // SELECT * FROM Games ORDER BY name;

	// res.json(games)
	res.render('allgames.pug', {games})
})

// find a game using a name query string /games/search?name=x
// incorporate the LIKE operator
router.get('/search', async (req, res) => {
	const {name} = req.query

	const game = await Game.findAll({
		// where: {name}

		where: {
			name: {
				[Op.substring]: name
			}
		}
	}) // SELECT * FROM Games WHERE name = ?

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
	// const game = await Game.findByPk(req.params.id, {
	// 	// include: Review
	// 	// include: [Review, User]
	// 	include: {
	// 		model: Review,
	// 		attributes: ['rating', 'content'],
	// 		include: {
	// 			model: User,
	// 			attributes: ['username']
	// 		}
	// 	},
	// 	attributes: ['name', 'category']
	// })

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

	const review = await Review.findByPk(3, {
		// include: User
	})
	const game = await review.getGame()

	res.json({review, game})
})

module.exports = router;