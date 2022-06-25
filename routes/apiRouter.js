const express = require('express');
const router = express.Router();
const { getAllStandings } = require('../controllers/FootballDataController');

router.all('/standings/', (req, res) => {
	getAllStandings()
		.then((standings) => {
			console.log(standings.length);
			res.json(standings);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Something went bad');
		});
});

router.all('*', (req, res) => {
	res.status(403).send('Bad request');
});

module.exports = router;
