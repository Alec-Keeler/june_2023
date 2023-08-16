const express = require('express')
const app = express();
require('dotenv').config()

app.use(express.json())

const DATA_SOURCE = process.env.DATA_SOURCE;
console.log(DATA_SOURCE)

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(DATA_SOURCE, sqlite3.OPEN_READWRITE);

// get all games
app.get('/games', (req, res) => {
	const sql = 'SELECT * FROM games;'
	const params = []

	db.all(sql, params, (err, rows) => {
		if (err) {
			return res.json(err)
		}
		res.json({
			games: rows
		})
	})
})

// get one game specified by id
app.get('/games/:id', (req, res) => {
	const sql = 'SELECT * FROM games WHERE id = ?'
	const params = [req.params.id]
	db.get(sql, params, (err, row) => {
		if (err) {
			return res.json(err)
		}
		if (row) {
			res.json({
				game: row
			})
		} else {
			res.status(404)
			res.send(`Game with an id of ${req.params.id} could not be found`)
		}
	})
})

// add a game
app.post('/games', (req, res) => {
	const {name, min_players, max_players, category, cost, avg_playtime, min_age} = req.body

	const sql = 'INSERT INTO games (name, min_players, max_players, category, cost, avg_playtime, min_age) VALUES (?,?,?,?,?,?,?);'
	const params = [name, min_players, max_players, category, cost, avg_playtime, min_age]
	db.run(sql, params, (err) => {
		if (err) {
			return res.json(err)
		}
		res.json({
			message: 'Game successfully added to the database'
		})
	})
})

const port = process.env.PORT
app.listen(port, console.log(`Listening on port ${port}...`))