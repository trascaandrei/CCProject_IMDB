const filterService = require('../services/filter.service');

const filterTask = (req, res, next) => {
    filterService.filterMovies(req.body)
    .then( (response) => {
        res.status(200).json(response)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "Internal server error"
        });

        req.error = err;
    });
}

module.exports = {
    filterTask: filterTask
}