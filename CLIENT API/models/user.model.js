const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    favourites: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie'
            }
        ]
    },
});

userSchema.index({
    email: 1,
    username: 1
}, {
    unique: true
});

userSchema.pre('save', function(next) {
    const user = this;

    /* only hash the password if it has been modified (or is new) */
    if (!user.isModified('password')) {
        return next();
    }

    /* generate a salt */
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        /* hash the password using our new salt */
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            /* override the cleartext password with the hashed one */
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var User = module.exports = mongoose.model('user', userSchema)

module.exports.get = function(callback, limit) {
    User.find(callback).limit(limit);
}