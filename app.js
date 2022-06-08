require('dotenv').config();
const express = require('express');
const CronJob = require('cron').CronJob;
const apiRouter = require('./routes/apiRouter');
const {
	mongoHelper,
	updateAllStandings,
} = require('./controllers/football-data');
const app = express();
const PORT = process.env.PORT ?? 5000;

//mongoHelper.connect(() => {
//console.log(process.env.mode);
// const updateStandingsJob = new CronJob(
// 	'0 */3 * * *',
// 	updateAllStandings,
// 	null,
// 	true,
// 	'Europe/Athens'
//);
//});

app.use('/api', apiRouter);
app.use('/', (req, res) => res.send('Hello world'));

mongoHelper.connect(() => {
	app.listen(PORT, () => {
		console.log(`Express server is runnig on port ${PORT}`);
	});
});
