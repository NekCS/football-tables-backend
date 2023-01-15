require('dotenv').config();
const express = require('express');
const CronJob = require('cron').CronJob;
const apiRouter = require('./routes/apiRouter');
const {
	mongoHelper,
	updateAllStandings,
} = require('./controllers/FootballDataController');
const app = express();
const PORT = process.env.PORT ?? 5000;

mongoHelper.connect(() => {
	//TODO Change update frequency on past seasons.
	updateAllStandings();
	const updateStandingsJob = new CronJob(
		'0 */3 * * *',
		updateAllStandings,
		null,
		true,
		'Europe/Athens'
	);
});

app.use('/api', apiRouter);
app.all('/', (req, res) => res.send('Football Data API'));
app.all('*', (req, res) => res.status(403).send('Bad request'));

mongoHelper.connect(() => {
	app.listen(PORT, () => {
		console.log(`Express server is runnig on port ${PORT}`);
	});
});
