
const User = require('../models/user.model');
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

/**
 * return username-ul unui user identificat prin id
 */
const getUsernameById = (id) => {
    return User.findById(id, {
        _id: 0,
        username: 1
    });
};

/* cauta un user dupa username = email */
const findUserByUsername = (username) => {
    return User.findOne({
        $or: [
            {
                username: username
            },
            {
                email: username
            }
        ],
    });
};

/* cauta un user dupa id */
const findUserById = (id) => {
    return User.aggregate([
        {
            $match: {
                _id: ObjectId(id)
            }
        },
        {
            $project: {
               username: true,
               email: true,
               firstName: true,
               lastName: true,
               favourites: true,
            }
         }
    ]);
}

/* creeaza un user */
const createUser = (userData) => {
    const user = new User(userData);

    return user.save();
};

/* actualizeaza un user */
const updateUser = (filter, userData) => {
    const updates = {
        $set: userData
    }

    return User.updateOne(filter, updates);
};

/**
 * actualizeaza parola unui user
 */
const updatePassword = (id, password) => {
    /* generate a salt */
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) {
                return reject(err);
            }
    
            /* hash the password using our new salt */
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }
    
                const filter = {
                    _id: id,
                };
                
                const updates = {
                    $set: {
                        password: hash
                    }
                }
    
                User.updateOne(filter, updates).then((response) => {
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    });
};

const favouriteMovie = async (movieId, userId) => {
    const filter = {
        _id: userId
    };

    const updates = {
        $push: {
            favourites: ObjectId(movieId)
        }
    };

    return User.updateOne(filter, updates);
}

module.exports = {
    getUsernameById: getUsernameById,
    findUserByUsername: findUserByUsername,
    findUserById: findUserById,
    createUser: createUser,
    updateUser: updateUser,
    updatePassword: updatePassword,
    favouriteMovie: favouriteMovie,
}
