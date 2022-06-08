const express = require('express');
const router = express.Router();
const { getAllStandings } = require('../controllers/football-data');

// router.use((req, res) => {
// 	console.log('api');
// 	next();
// });

router.all('/standings/', (req, res) => {
	getAllStandings()
		.then((standings) => {
			console.log(standings);
			res.json(standings);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Something went bad');
		});
});

router.all('*', (req, res) => {
	res.send('API');
});

module.exports = router;
