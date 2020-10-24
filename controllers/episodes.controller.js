const { fetchEpisodes } = require('../models/episodes.model')

exports.getEpisodes = (req, res, next) => {
    const { isGood, minSeason, maxSeason } = req.query;
    fetchEpisodes(isGood, minSeason, maxSeason)
    .then(episodes => {
        return res.status(200).send({ episodes })
    })
}