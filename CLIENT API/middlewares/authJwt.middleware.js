const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

/**
 * valideaza token-ul existent in request
 */
const verifyToken = (req, res, next) => {
    let message = "";
    const token = req.headers["x-access-token"];

    if (!token) {
        message = "No token provided!";
        res.status(403).json({
            message: message
        });

        req.warning = message;
        return next();
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log(err);
            message = "Unauthorized!";
            res.status(401).json({
                message: message
            });

            req.warning = message;
            return next();
        }

        /**
         * salvam id-ul user-ului care a facut request-ul
         * deci in URL sau body request nu trebuie sa se specifice acel id de mongo
         */
        req.id = decoded.id;
        next();
    });
};


module.exports = {
    verifyToken: verifyToken,
};
