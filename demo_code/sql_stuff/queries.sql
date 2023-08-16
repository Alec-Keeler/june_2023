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