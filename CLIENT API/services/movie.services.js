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

const rateMovie = async (rate, movieId) => {
    const movie = await findMovieById(movieId);
    const newRating = (movie.ratingsNumber * movie.rating + rate) / (movie.ratingsNumber + 1);

    const filter = {
        _id: movieId
    };

    const updates = {
        $set: {
            rating: newRating
        },
        $inc: {
            ratingsNumber: 1
        }
    };

    return Movie.updateOne(filter, updates);
}

module.exports = {
    create: create,
    findMovieById: findMovieById,
    getAllMovies: getAllMovies,
    updateMovie: updateMovie,
    rateMovie: rateMovie,
}