const login_router = require('./auth.routes');
const user_router = require('./user.routes');
const movie_router = require('./movie.routes');

module.exports = (app) => {
    app.use('/api/', login_router);

    app.use('/api/', user_router);

    app.use('/api/', movie_router);
};