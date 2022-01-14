const Movie = require('../models/movie.model');

const filterMovies = async (body) => {

    let filter = {}
    let sortRules = {}
    if (body.filter) {
        if (body.filter.actor) {
            filter[actors] = body.filter.actor
        }

        if (body.filter.title) {
            filter[title] = body.filter.title
        }

        if (body.filter.rating) {
            let min = body.filter.rating.min ? body.filter.rating.min : 0
            let max = body.filter.rating.max ? body.filter.rating.max : 10
            filter[rating] = { $gte : min, $lte : max}
        }

        if (body.filter.genre) {
            filter[genre] = body.filter.genre
        }

        if (body.filter.publishYear) {
            let min = body.filter.publishYear.min ? body.filter.publishYear.min : 0
            let max = body.filter.publishYear.max ? body.filter.publishYear.max : 10
            filter[publishYear] = { $gte : min, $lte : max}
        }

        if (body.filter.boxOffice) {
            let min = body.filter.boxOffice.min ? body.filter.boxOffice.min : 0
            let max = body.filter.boxOffice.max ? body.filter.boxOffice.max : 10
            filter[boxOffice] = { $gte : min, $lte : max}
        }

        if (body.filter.budget) {
            let min = body.filter.budget.min ? body.filter.budget.min : 0
            let max = body.filter.budget.max ? body.filter.budget.max : 10
            filter[budget] = { $gte : min, $lte : max}
        }
    }

    if (body.sort) {
        let defaultSortKey = body.sort.key ? body.sort.key : "publishYear"
        let defaultSortType = body.sort.type ? body.sort.type : -1
        sortRules[defaultSortKey] = defaultSortType
    }

    let query = Movie.find(filter).sort(sortRules)
    if (body.limit) {
        query.limit(body.limit)
    }

    return await query.exec()
}

module.exports = {
    filterMovies: filterMovies
}