const express = require('express')
const router = express.Router({mergeParams: true})

// /colors/:name/shades
router.get('/', (req, res) => {
	console.log(req.params)
	res.send(`Shades associated with ${req.params.name}`)
})


module.exports = router;