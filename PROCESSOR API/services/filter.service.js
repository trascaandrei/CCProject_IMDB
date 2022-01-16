const Movie = require('../models/movie.model');

const filterMovies = async (body) => {

    let filter = {}
    let sortRules = {}
    let min = {"_id": 0, "__v": 0}

    if (body.filter) {
        if (body.filter.actor) {
            filter.actors = new RegExp('\\b' + body.filter.actor + '\\b', 'i')
        }

        if (body.filter.title) {
            filter.title = new RegExp(body.filter.title, 'i')
        }

        if (body.filter.rating) {
            let min = body.filter.rating.min ? body.filter.rating.min : 0
            let max = body.filter.rating.max ? body.filter.rating.max : 10
            filter.rating = { $gte : min, $lte : max}
        }

        if (body.filter.genre) {
            filter.genre = new RegExp(body.filter.genre, 'i')
        }

        if (body.filter.publishYear) {
            let min = body.filter.publishYear.min ? body.filter.publishYear.min : 0
            let max = body.filter.publishYear.max ? body.filter.publishYear.max : new Date().getFullYear()
            filter.publishYear = { $gte : min, $lte : max}
        }

        if (body.filter.boxOffice) {
            let min = body.filter.boxOffice.min ? body.filter.boxOffice.min : 0
            let max = body.filter.boxOffice.max ? body.filter.boxOffice.max : 10
            filter.boxOffice = { $gte : min, $lte : max}
        }

        if (body.filter.budget) {
            let min = body.filter.budget.min ? body.filter.budget.min : 0
            let max = body.filter.budget.max ? body.filter.budget.max : 10
            filter.budget = { $gte : min, $lte : max}
        }
    }

    if (body.sort) {
        for (var i = 0; i < body.sort.length; i++) {
            let defaultSortKey = body.sort[i].key
            let defaultSortType = ([true, false].includes(body.sort[i].asc)) ? 
                (body.sort[i].asc === true ? 1 : -1) :
                -1

            sortRules[defaultSortKey] = defaultSortType
        }
    }

    console.log(
        "Requesting filtering < filter = %j | sort = %j | limit = %s",
        filter,
        sortRules,
        (body.limit) ? body.limit : "All"
    )

    let query = Movie.find(filter, min).sort(sortRules)
    if (body.limit) {
        query.limit(body.limit)
    }

    return await query.exec()
}

module.exports = {
    filterMovies: filterMovies
}