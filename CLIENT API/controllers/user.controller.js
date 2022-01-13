const userService = require('../services/user.services');
const User = require('../models/user.model');
const ObjectId = require('mongodb').ObjectID;
const check = require('../services/check_exceptions.services').check;

/**
 * obtine informatiile despre un utilizator
 */
const getUserInfo = (req, res, next) => {
    if (check(req)) {
        return next();
    }

    let message = "";
    if (!req.id) {
        message = "No id provided.";
        res.status(400).json({
	        message: message
	    });

        req.warning = message;
        return next();
    }

    const id = req.params.id ? req.params.id : req.id

    userService.findUserById(id)
    .then((user) => {
        if(!user) {
            message = "User not found";
            res.status(404).json({
                message: message
            });

            req.warning = message;
            return next();
        }

        res.status(200).json(
            user[0]
        );

        req.info = user;
        next();
    }).catch((err) => {
        res.status(500).json({
            message: "Internal server error"
        });

        req.error = err;
        next();
    });
};

/**
 * actualizeaza datele unui utilizator
 */
const editUser = (req, res, next) => {
    if (check(req)) {
        return next();
    }

    let message = "";

    if (req.body.favourites || req.body.password) {
        message = "Unauthorized";

        res.status(400).json({
            message: message
        });

        req.warning = message;
        return next();
    }

    console.log(`Updating user ${req.id} information...`)

    if (!req.id) {
        message = "No id provided.";
        res.status(400).json({
	        message: message
	    });

        req.warning = message;
        return next();
    }

    if (Object.keys(req.body).length === 0) {
        message = "Update info missed.";
		res.status(400).json({
	        message: message
	    });

        req.warning = message;
        return next();
    }

    
    const filter = {
        _id: req.id
    };

    userService.updateUser(filter, req.body).then((response) => {
        if(!response.n) {
            message = "User not found";
            res.status(404).json({
                message: message
            });

            req.warning = message;
            return next();  
        }

        message = "Update user successfully";
        res.status(200).json({
            message: message
        });

        req.info = message;
        console.log('User updated');

        next();
    }).catch((err) => {
        res.status(500).json({
            message: "Internal server error"
        });

        req.error = err;
        next();
    });
};

module.exports = {
    getUserInfo: getUserInfo,
    editUser: editUser,
}
