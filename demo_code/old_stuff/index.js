console.log(process.env.PASSWORD)

let users = [
	{birthdate: '09-15-1989', username: 'backend_daddy', password: 'hunter2', email: 'alec@alec.alec', faveGameId: 2},
	{birthdate: '01-01-1942', username: 'dantheman', password: 'password123!', email: 'dan@dan.dan', faveGameId: 4},
	{birthdate: '07-14-1789', username: 'franco_revolution', password: 'motedepasse123', email: 'franco@franco.franco', faveGameId: 3}
]

let reviews = [
	{rating: 10, complexity: 6, content: 'Best game to lose friends over', gameId: 2, userId: 1},
	{rating: 1, complexity: 5, content: 'ZOOS ARE PRISONS AND ZOO GAMES ARE BAD :( FREE THE PONIES', gameId: 3, userId: 2},
	{rating: 8, complexity: 7, content: 'Ark Nova is Terraforming Mar\'s, but better', gameId: 3, userId: 3}
]

let likes = [
	{reviewId: 1, userId: 1, like: true},
	{reviewId: 2, userId: 1, like: false},
	{reviewId: 3, userId: 1, like: true},
	{reviewId: 1, userId: 2, like: true},
	{reviewId: 3, userId: 2, like: false},
	{reviewId: 2, userId: 3, like: false},
]