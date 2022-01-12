var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    title: {
        type: String
    },

    description: {
        type: String
    },

    actors: {
        type: [{
            type: String
        }]
    },

    rating: {
        type: Number
    },

    genre: {
        type: String
    },

    publishYear: {
        type: String
    },

    boxOffice: {
        type: Number
    },

    budget: {
        type: Number
    }
});

var Movie = module.exports = mongoose.model('movie', movieSchema)

module.exports.get = function(callback, limit) {
    Movie.find(callback).limit(limit);
}