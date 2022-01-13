const router = require('express').Router();
const authJwt = require('../middlewares/authJwt.middleware');
const movieController = require('../controllers/movie.controller');


// Movie management
router.post('/movie', [
        authJwt.verifyToken,
    ],
    movieController.addMovie
);

router.get('/movie/:movieId', [
        authJwt.verifyToken
    ],
    movieController.getMovie
);

router.get('/movies', [
    authJwt.verifyToken
],
    movieController.getMovies
);

router.put('/movie/favourite/:movieId', [
        authJwt.verifyToken
    ],
    movieController.favouriteMovie
);

module.exports = router;