SELECT * FROM games;


SELECT name, cost FROM games;


SELECT * FROM games
WHERE name = 'Diplomacy';

SELECT * FROM games
WHERE min_players <= 2;

SELECT * FROM games
WHERE max_players <= 4 OR category = 'Deck-Building';

SELECT * FROM games
WHERE NOT category = 'Strategy';

DELETE FROM games
WHERE avg_playtime >= 180;

UPDATE games
SET avg_playtime = 420
WHERE name = 'Diplomacy';

UPDATE games
SET cost = cost + 10;

--------------------

SELECT * FROM games
WHERE cost BETWEEN 60 AND 100;

SELECT * FROM games
WHERE min_age IN (12, 14);

SELECT * FROM games
WHERE name LIKE '%om%';

SELECT * FROM games
ORDER BY min_age DESC, name DESC;

SELECT * FROM games
WHERE min_age = 14
ORDER BY name DESC;

SELECT * FROM games
ORDER BY cost DESC
LIMIT 5
OFFSET 10;

SELECT users.id, users.username, users.fave_game_id, games.id, games.name, reviews.game_id, reviews.content FROM reviews
JOIN games ON (reviews.game_id = games.id)
JOIN users ON (users.fave_game_id = games.id)
WHERE users.id = 3;


-- For a user with id of 1, find all games for reviews they've liked
SELECT users.email, users.id, likes.user_id, likes.review_id, reviews.id, reviews.game_id, games.id, games.name FROM users
JOIN likes ON (users.id = likes.user_id)
JOIN reviews ON (likes.review_id = reviews.id)
JOIN games ON (reviews.game_id = games.id)
WHERE users.id = 1;

-- Find the likes associated to a review with an id of 3

SELECT * FROM likes
JOIN reviews ON (likes.review_id = reviews.id)
WHERE reviews.id = 3;

----------------
SELECT COUNT(*), name, category FROM games
WHERE min_age = 14;

SELECT AVG(cost), * FROM games;

SELECT MIN(cost), * FROM games;

SELECT AVG(cost) AS average_cost, min_age FROM games
GROUP BY min_age
HAVING min_age > 50;

SELECT * FROM games
JOIN reviews ON (games.id = reviews.game_id)
WHERE games.name = 'Ark Nova';

SELECT * FROM reviews
WHERE game_id = (
	SELECT id FROM games
	WHERE games.name = 'Ark Nova'
);

SELECT * FROM reviews
WHERE game_id IN (
	SELECT fave_game_id FROM users
	WHERE username = 'backend_daddy'
);

SELECT * FROM games
WHERE id IN (
	SELECT game_id FROM reviews
	WHERE id IN (
		SELECT review_id FROM likes
		WHERE user_id = (
			SELECT id FROM users 
			WHERE username = 'franco_revolution'
		)
	)
);