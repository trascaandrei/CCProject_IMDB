const movieService = require('../services/movie.services');
const userService = require('../services/user.services');

const { check } = require('../services/check_exceptions.services');


const addMovie = (req, res, next) => {
    if (check(req)) {
        return next();
    }

    console.log(`Adding movie from user ${req.id}`)

    let message = '';

    const movie = {
        title: req.body.title,
        description: req.body.description ? req.body.description : "",
        actors: req.body.actors,
        rating: 0,
        ratingsNumber: 0,
        genre: req.body.genre,
        publishYear: req.body.publishYear,
        boxOffice: req.body.boxOffice,
        budget: req.body.budget,
    }

    console.log('Adding to the collection...');
    movieService.create(movie)
    .then(() => {
        message = "Movie added successfully";
        res.status(200).json({
            message: message
        });
        
        req.info = message;
        console.log(message);
        next();
    })
    .catch((err) => {
        console.log(err);
        message = "Internal Server Error"
        res.status(500).json({
            message: message
        })

        req.error = err;
        next();
    })
}

const getMovie = (req, res, next) => {
    console.log(req.params)
    if (check(req)) {
        return next();
    }

    let message = "";
    if (!req.params.movieId) {
        message = "No id provided";
        res.status(400).json({
            message: message
        });

        req.warning = message;
        return next();
    }

    movieService.findMovieById(req.params.movieId)
    .then((movie) => {
        if (!movie) {
            message = "movie not found";
            res.status(404).json({
                message: message
            });

            req.warning = message;
            return next();
        }

        res.status(200).json(movie);
    })
    .catch((err) => {
        res.status(500).json({
            message: "Internal server error"
        });

        req.error = err;
        next();
    });
};

const getMovies = (req, res, next) => {
    if (check(req)) {
        return next();
    }

    let message = "";

    movieService.getAllMovies()
    .then((movies) => {
        if (!movies.length) {
            message = "movies not found";
            res.status(404).json({
                message: message
            });

            req.warning = message;
            return next();
        }

        res.status(200).json(movies);
    })
    .catch((err) => {
        res.status(500).json({
            message: "Internal server error"
        });

        req.error = err;
        next();
    });
};

const favouriteMovie = async (req, res, next) => {
    if (check(req)) {
        return next();
    }

    let message = "";
    if (!req.id || !req.params.movieId) {
        message = "No id provided";
        res.status(400).json({
            message: message
        });

        req.warning = message;
        return next();
    }

    console.log(`Adding to favourites movie with id ${req.params.movieId}...`);
    
    userService.favouriteMovie(req.params.movieId, req.id).then(() => {
        res.status(200).json({
            message: 'Added to favourites successfully'
        })

        next();
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });

        req.error = err;
        next();
    });
}

const rateMovie = async (req, res, next) => {
    if (check(req)) {
        return next();
    }

    let message = "";
    if (!req.id || !req.params.movieId) {
        message = "No id provided";
        res.status(400).json({
            message: message
        });

        req.warning = message;
        return next();
    }

    console.log(`Rating movie with id ${req.params.movieId}...`);
    movieService.rateMovie(req.body.rate, req.params.movieId).then(() => {
        res.status(200).json({
            message: 'Rated successfully'
        })

        next();
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });

        req.error = err;
        next();
    });
}

module.exports = {
    addMovie: addMovie,
    getMovie: getMovie,
    getMovies: getMovies,
    favouriteMovie: favouriteMovie,
    rateMovie: rateMovie,
}