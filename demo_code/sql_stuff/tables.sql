DROP TABLE IF EXISTS games;

CREATE TABLE games (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR NOT NULL UNIQUE,
	min_players INTEGER NOT NULL,
	max_players INTEGER NOT NULL,
	category VARCHAR(50) NOT NULL DEFAULT 'other',
	cost DECIMAL(5,2) NOT NULL,
	avg_playtime INTEGER, -- represents num minutes
	min_age INTEGER NOT NULL
);