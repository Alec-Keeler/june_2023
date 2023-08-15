const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.json('GET /colors')
})

// /colors/:name/shades
router.get('/:name', (req, res) => {
	res.json(`GET /colors/${req.params.name}`)
})

// /colors/:name/shades
const shadesRouter = require('./shades')
router.use('/:name/shades', shadesRouter)

module.exports = router