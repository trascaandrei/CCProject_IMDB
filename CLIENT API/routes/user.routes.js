const router = require('express').Router();
const authJwt = require('../middlewares/authJwt.middleware');
const userController = require('../controllers/user.controller');

/**
 * obtine informatiile despre un utilizator
 */
router.get('/user/info/:id', [
		authJwt.verifyToken,
	],
    userController.getUserInfo
);

router.get('/user', [
        authJwt.verifyToken,
    ],
    userController.getUserInfo
);

/**
 * actualizeaza datele unui utilizator
 */
router.put('/user', [
	    authJwt.verifyToken,
	],
    userController.editUser
);

/* export API routes */
module.exports = router;
