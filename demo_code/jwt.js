//jwt
	// header - algorithm, type of token
	// payload - data to be transmitted, claim
	// signature - encoded header + encoded payload + secret key >> hash algorithm
const jwt = require('jsonwebtoken')

// const token = jwt.sign({
// 	username: 'Alec',
// 	id: 123
// }, 'password')

// console.log(token)

const tokenValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsZWMiLCJpZCI6MTIzLCJpYXQiOjE2OTM0OTk4NjN9.1RlNjFiu9Ti9Z-ZI6fLUGRShTSoMmGu6dyPW0GhdrlY'

// const payload = jwt.verify(tokenValue, 'password')
// console.log(payload)

const bcrypt = require('bcryptjs')

const hashPass = async (password) => {
	const hash = await bcrypt.hash(password, 10)
	console.log(hash)
}

hashPass('password123')

const hash = '$2a$12$NIu6JxB/upFfHMN4ihhUmuqTfI5PRbyDThI65.ftfJny8fy/c/wlS'
			// \__/\/ \____________________/\_____________________________/
			// Alg Cost      Salt                        Hash

const testPass = async (password, hash) => {
	const isPass = await bcrypt.compare(password, hash)
	console.log(isPass)
}

// testPass('password123', hash)