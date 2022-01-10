const userService = require('../services/user.services');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const validator = require('email-validator');
require('dotenv').config();

const login = (req, res, next) => {
    let message = "";
    if (!req.body.username || !req.body.password) {
        message = "Username and password are required";
        res.status(400).send({
            message: message
        });

        req.warning = message;
        return next();
    }

    userService.findUserByUsername(req.body.username).then((user) => {
        if (!user) {
            message = `User ${req.body.username} not found.`;
            res.status(404).json({
                message: message
            });

            req.warning = message;
            return next();
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(500).json({
                    message: "Internal server error"
                });

                req.error = err;
                return next();
            }

            if (!isMatch) {
                message = "Invalid password";
                res.status(401).json({
                    message: message
                });

                req.warning = message;
                return next();
            }

            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 /* 24 hours -> trebuie sa stabilim cat va fi valabil un token :)) */
            });

            res.status(200).send({
                accessToken: token,
            });

            req.info = "user logged in successfully";
            return next();
        });
    });
}

const signUp = (req, res, next) => {
    let message = "";
    console.log(req.body);
    if (!req.body.password || !req.body.email || !req.body.username) {
        message = "SignUp infos are missing";
            console.log(message);
        res.status(400).send({
            message: message
        });

        req.warning = message;
        return next();
    }

    console.log(`Registering user with username ${req.body.username}...`)

    if (!validator.validate(req.body.email)) {
        message = "Email is invalid";
        console.log(message);
            res.status(400).send({
                message: message
            });

        req.warning = message;
        return next();
    }
    
    const userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };

    userService.createUser(userData).then((user) => {
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 /* 24 hours */
        });

        console.log(`${req.body.username} registered successfully`);

        res.status(201).json({
            accessToken: token,
        });

        console.log('Sending access token...')

        req.info = "user sign up successfully";

        console.log('Authentication completed.');

        next();
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "Internal server error"
        });

        req.error = err;
        next();
    });
};

module.exports = {
    login: login,
    signUp: signUp,
};
