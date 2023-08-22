INSERT INTO games (name, min_players, max_players, category, cost, avg_playtime, min_age)
VALUES
('Twilight Imperium', 3, 8, 'Strategy', 131.99, 360, 14),
('Diplomacy', 2, 7, 'Strategy', 29.99, 360, 12),
('Ark Nova', 1, 4, 'Euro', 69.95, 120, 14),
('My Little Pony: Adventures in Equestria', 1, 4, 'Deck-Building', 37.95, 60, 14),
('Brass: Birmingham', 2, 4, 'Strategy', 79.95, 90, 14),
('Gloomhaven', 1, 4, 'Coop', 170, 90, 14),
('The Castles of Burgundy', 2, 4, 'Euro', 49.99, 60, 12),
('Spirit Island', 1, 4, 'Coop', 63.48, 105, 13);

INSERT INTO games (name, min_players, max_players, cost, avg_playtime, min_age)
VALUES
('Duple', 3, 6, 8.00, 20, 10);

INSERT INTO users (birthdate, username, password, email, fave_game_id)
VALUES
('09-15-1989', 'backend_daddy', 'hunter2', 'alec@alec.alec', 2),
('01-01-1942', 'dantheman', 'password123!', 'dan@dan.dan', 4),
('07-14-1789', 'franco_revolution', 'motedepasse123', 'franco@franco.franco', 3);

INSERT INTO reviews (rating, complexity, content, game_id, user_id)
VALUES
(10, 6, 'Best game to lose friends over', 2, 1),
(1, 5, 'ZOOS ARE PRISONS AND ZOO GAMES ARE BAD :( FREE THE PONIES', 3, 2),
(8, 7, 'Ark Nova is Terraforming Mar''s, but better', 3, 3);

INSERT INTO likes (review_id, user_id, like)
VALUES
--R/U/L?
(1, 1, 1),
(2, 1, 0),
(3, 1, 1),
(1, 2, 1),
(3, 2, 0),
(2, 3, 0);

-- let games = [
	-- { name: 'Twilight Imperium', minPlayers: 3, maxPlayers: 8, category: 'Strategy', cost: 131.99, avgPlayTime: 360, minAge: 14},
	-- { name: 'Diplomacy', minPlayers: 2, maxPlayers: 7, category: 'Strategy', cost: 29.99, avgPlayTime: 360, minAge: 12},
	-- { name: 'Ark Nova', minPlayers: 1, maxPlayers: 4, category: 'Euro', cost: 69.95, avgPlayTime: 120, minAge: 14},
	-- { name: 'My Little Pony: Adventures in Equestria', minPlayers: 1, maxPlayers: 4, category: 'Deck-Building cost:', cost: 37.95, avgPlayTime: 60, minAge: 14},
	-- { name: 'Brass: Birmingham', minPlayers: 2, maxPlayers: 4, category: 'Strategy', cost: 79.95, avgPlayTime: 90, minAge: 14},
	-- { name: 'Gloomhaven', minPlayers: 1, maxPlayers: 4, category: 'Coop', cost: 170, avgPlayTime: 90, minAge: 14},
	-- { name: 'The Castles of Burgundy', minPlayers: 2, maxPlayers: 4, category: 'Euro', cost: 49.99, avgPlayTime: 60, minAge: 12},
	-- { name: 'Spirit Island', minPlayers: 1, maxPlayers: 4, category: 'Coop', cost: 63.48, avgPlayTime: 105, minAge: 1}
-- ]