const router = require('express').Router();
const authJwt = require('../middlewares/authJwt.middleware');
const movieController = require('../controllers/movie.controller');

// Movie management
router.post('/movie', [
        authJwt.verifyToken,
    ],
    movieController.addMovie
);

router.get('/movie/:movieId', movieController.getMovie);

router.get('/movies', movieController.getMovies);

router.put('/movie/favourite/:movieId', [
        authJwt.verifyToken
    ],
    movieController.favouriteMovie
);

router.put('/movie/rate/:movieId', [
        authJwt.verifyToken
    ],
    movieController.rateMovie
);

module.exports = router;