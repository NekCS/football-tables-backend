require('dotenv').config();
const FootballDataApi = require('../utils/FootballDataApi');
const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;
const MongoHelper = require('../utils/MongoHelper');
const fd = new FootballDataApi(FOOTBALL_API_KEY);

const mongoHelper = new MongoHelper(process.env.MONGO_URI);

const updateAllStandings = () => {
	updateStandings('PL', 2020);
	updateStandings('FL1', 2020);
	updateStandings('PL', 2021);
	updateStandings('FL1', 2021);
	updateStandings('BL1', 2021);
	updateStandings('BL1', 2020);
};

const getAllStandings = () => {
	return mongoHelper.getStandings();
};

const updateStandings = (competitionCode, seasonYear) => {
	fd.getCompetitionStandings(competitionCode, {
		season: seasonYear,
	})
		.then((standings) => {
			const parsedStandings = parseStandings(standings, seasonYear);
			mongoHelper
				.saveStandings(parsedStandings)
				.then(() => {
					console.info(
						`Standings ${parsedStandings.competition.code} - ${parsedStandings.season.year} saved.`
					);
				})
				.catch((error) => {
					console.info(
						`Standings ${parsedStandings.competition.code} - ${parsedStandings.season.year} update failed.`
					);
				});
		})
		.catch((error) => {
			console.log(
				`Error fetching standings for ${competitionCode} - ${seasonYear}`
			);
		});
};

const parseStandings = (standings, seasonYear) => {
	const newStandings = {
		slug: `${standings.competition.code}-${seasonYear}`,
		competition: standings.competition,
		season: {
			...standings.season,
			year: seasonYear,
		},
		standings: standings.standings[0].table,
	};

	return newStandings;
};

module.exports = {
	mongoHelper,
	updateAllStandings,
	getAllStandings,
};
