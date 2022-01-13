const { update } = require('../models/movie.model');
const Movie = require('../models/movie.model');
const ObjectId = require('mongodb').ObjectID;

const create = (data) => {
    const movie = new Movie(data);

    return movie.save();
}

const findMovieById = (id) => {
    return Movie.findById(id);
}

const updateMovie = (filter, data) => {
    return Movie.updateOne(filter, {
        $set: data
    });
}

const getAllMovies = () => {
    return Movie.find({});
}

module.exports = {
    create: create,
    findMovieById: findMovieById,
    getAllMovies: getAllMovies,
    updateMovie: updateMovie,
}