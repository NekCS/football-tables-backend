const axios = require('axios').default;
/**
 * Class representing a FootballDataApi
 */
class FootballDataApi {
	/**
	 * Create a FootballDataApi object
	 * @param {string} inputApiKey The football-data API key
	 */
	constructor(inputApiKey) {
		const apiKey = inputApiKey;

		this.axiosObj = axios.create({
			baseURL: 'http://api.football-data.org/v2',
			headers: {
				'X-Auth-Token': apiKey,
			},
		});
	}

	/**
	 * Get information about all the available competitions
	 * @param {Object} [filters] - An object of filters.
	 * @param {number} [filters.areas] - The id of an area.
	 * @param {string} [filters.plan] - TIER_ONE | TIER_TWO | TIER_THREE | TIER_FOUR
	 * @return {Promise}
	 */
	getCompetitions(filters) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get('/competitions/', {
					params: filters,
				})
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get information about a specific competition
	 * @param {number|string} competitionId - The unique string or number identifier
	 * for the competition
	 * @return {Promise}
	 */
	getCompetition(competitionId) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/competitions/${competitionId}`)
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get information about the teams of a specific competition
	 * @param {number|string} competitionId - The unique string or number identifier
	 * for the competition
	 * @param {Object} [filters] - An object of filters.
	 * @param {number|string} [filters.season] - The starting year of a season
	 * e.g. 2017 or 2016.
	 * @param {string} [filters.stage] - The stage for a competition e.g. ROUND_OF_16
	 * @return {Promise}
	 */
	getCompetitionTeams(competitionId, filters) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/competitions/${competitionId}/teams`, {
					params: filters,
				})
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get information about the standings of a specific competition
	 * @param {number|string} competitionId The unique string or number identifier
	 * for the competition
	 * @param {Object} [filters] - An object of filters.
	 * @param {string} [filters.standingType] -
	 * TOTAL (default) | HOME | AWAY
	 * @return {Promise}
	 */
	getCompetitionStandings(competitionId, filters) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/competitions/${competitionId}/standings/`, {
					params: filters,
				})
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});

		return returnedPromise;
	}

	/**
	 * Get information about the standings of specific competitions
	 * @param {(number|string)[]} competitionsArray An array of strings and numbers
	 * competitions identifiers
	 * @param {Object} [filters] - An object of filters.
	 * @param {string} [filters.standingType] - TOTAL (default) | HOME | AWAY
	 * @return {Promise}
	 */
	getCompetitionsStandings(competitionsArray = [], filters) {
		const promisesArray = competitionsArray.map((competitionId) => {
			return this.getCompetitionStandings(competitionId, filters);
		});

		return Promise.all(promisesArray);
	}

	/**
	 * Get information about the matches of a specific competition
	 * @param {number|string} competitionId The unique string or number identifier
	 * for the competition
	 * @param {Object} [filters] - An object of filters.
	 * @param {string} [filters.dateFrom] - e.g. 2018-06-22
	 * @param {string} [filters.dateTo] - e.g. 2018-06-22
	 * @param {string} [filters.stage] - The stage for a competition e.g. ROUND_OF_16
	 * @param {string} [filters.status] -
	 * The status of a match. [SCHEDULED | LIVE | IN_PLAY | PAUSED | FINISHED |
	 * POSTPONED | SUSPENDED | CANCELED]
	 * @param {number} [filters.matchday] - Number /[1-4]+[0-9](*)/ e.g. 38
	 * @param {string} [filters.group] - Allows filtering for groupings in a
	 * competition. String /[A-Z]+/
	 * @param {string} [filters.season] - The starting year of a season
	 * e.g. 2017 or 2016.
	 * @return {Promise}
	 */
	getCompetitionMatches(competitionId, filters) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/competitions/${competitionId}/matches`, {
					params: filters,
				})
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get information about the scorers of a specific competition
	 * @param {number|string} competitionId The unique string or number
	 * identifier for the competition
	 * @param {Object} [filters] - An object of filters.
	 * @param {number} [filters.limit] - Limits your result set to the given number.
	 * Defaults to 10.
	 * @return {Promise}
	 */
	getCompetitionScorers(competitionId, filters) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/competitions/${competitionId}/scorers`, {
					params: filters,
				})
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get information about upcoming matches
	 * @param {Object} [filters] - An object of filters.
	 * @param {(number|string)[]} [filters.competitions] - Competitions identifiers
	 * @param {string} [filters.dateFrom] - e.g. 2018-06-22
	 * @param {string} [filters.dateTo] - e.g. 2018-06-22
	 * @param {string} [filters.status] - The status of a match. [SCHEDULED | LIVE |
	 * IN_PLAY | PAUSED | FINISHED | POSTPONED | SUSPENDED | CANCELED]
	 * @return {Promise}
	 */
	getMatches(filters) {
		if (filters.competitions) {
		}
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get('/matches', {
					params: filters,
				})
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get information about a specific match
	 * @param {number} matchId The unique number identifier for the match
	 * @return {Promise}
	 */
	getMatch(matchId) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/matches/${matchId}`)
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get all matches a specific team
	 * @param {number} teamId The unique number identifier for the team
	 * @param {Object=} filters An object of filters.
	 * Available filters:
	 * * dateFrom={DATE}
	 * * dateTo={DATE}
	 * * status={STATUS}
	 * * venue={VENUE}
	 * * limit={LIMIT}
	 * @return {Promise}
	 */
	getTeamMatches(teamId, filters) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/teams/${teamId}/matches/`, {
					params: filters,
				})
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get a specific team
	 * @param {number} teamId The unique number identifier for the team
	 * @return {Promise}
	 */
	getTeam(teamId) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/teams/${teamId}/`)
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get all areas
	 * @return {Promise}
	 */
	getAreas() {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get('/areas/')
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get a specific area
	 * @param {number} areaId The unique number identifier for the area
	 * @return {Promise}
	 */
	getArea(areaId) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/areas/${areaId}`)
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get a specific player
	 * @param {number} playerId The unique number identifier for the player
	 * @return {Promise}
	 */
	getPlayer(playerId) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/players/${playerId}`)
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}

	/**
	 * Get all matches for a specific player
	 * @param {number} playerId The unique number identifier for the player
	 * @param {Object=} filters An object of filters.
	 * Available filters:
	 * * dateFrom={DATE}
	 * * dateTo={DATE}
	 * * status={STATUS}
	 * * competitions={competitionIds}
	 * * limit={LIMIT}
	 * @return {Promise}
	 */
	getPlayerMatches(playerId, filters) {
		const returnedPromise = new Promise((resolve, reject) => {
			this.axiosObj
				.get(`/players/${playerId}/matches`, {
					params: filters,
				})
				.then((response) => {
					handleAxiosSuccess(response, resolve);
				})
				.catch((error) => {
					handleAxiosError(error, reject);
				});
		});
		return returnedPromise;
	}
}

const handleAxiosSuccess = (response, resolve) => {
	response.data.ajaxStatus = 'success';
	resolve(response.data);
};

const handleAxiosError = (error, reject) => {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		reject({
			ajaxStatus: 'error',
			errorMessage: error.response.data.message,
			errorCode: error.response.status,
		});
	} else if (error.request) {
		// The request was made but no response was received
		reject({
			ajaxStatus: 'error',
			errorMessage: 'The request was made but no response was received',
		});
	} else {
		// Something happened in setting up the request that triggered an Error
		reject({
			ajaxStatus: 'error',
			errorMessage: error.message,
		});
	}
};

module.exports = FootballDataApi;
