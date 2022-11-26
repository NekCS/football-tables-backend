const { MongoClient } = require('mongodb');

class MongoHelper {
	constructor(uri) {
		this.client = new MongoClient(uri);
	}

	connect(callback) {
		this.client
			.connect()
			.then((response) => {
				console.log('Mongo connection established');
				if (typeof callback === 'function') callback();
			})
			.catch((error) => {
				console.log(error);
				console.error('Mongo connection error');
			});
	}

	close(callback) {
		this.client
			.close()
			.then((response) => {
				console.log('Mongo connection closed');
				if (typeof callback === 'function') callback();
			})
			.catch((error) => {
				console.error('Something went bad trying to close Mongo connection');
				console.error(error);
			});
	}

	getStandings() {
		const promise = this.client
			.db('football-data')
			.collection('standings')
			.aggregate([
				{
					$sort: {
						updated: -1,
					},
				},
				{
					$group: {
						_id: { slug: '$slug' },
						slug: { $first: '$slug' },
						competition: { $first: '$competition' },
						standings: { $first: '$standings' },
						season: { $first: '$season' },
						updated: { $first: '$updated' },
					},
				},
				{
					$project: {
						_id: 0,
						slug: 1,
						updated: 1,
						'competition.name': 1,
						'competition.code': 1,
						'season.startDate': 1,
						'season.endDate': 1,
						'season.year': 1,
						standings: 1,
					},
				},
			])
			.toArray();

		return promise;
	}
	/* getStandings() {
		const promise = this.client
			.db('football-data')
			.collection('standings')
			.find(
				{},
				{
					projection: {
						_id: 0,
						'competition.name': 1,
						'competition.code': 1,
						'season.startDate': 1,
						'season.endDate': 1,
						'season.year': 1,
						standings: 1,
					},
				}
			)
			.toArray();

		return promise;
	} */

	saveStandings(standings) {
		const promise = this.client
			.db('football-data')
			.collection('standings')
			.updateOne(
				{
					'season.year': standings.season.year,
					'competition.code': standings.competition.code,
				},
				{
					$set: { ...standings, updated: new Date() },
				},
				{ upsert: true }
			);

		return promise;
	}
}

module.exports = MongoHelper;
