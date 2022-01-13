const router = require("express").Router();

const { sendRequest } = require("../http-client");

router.post('/login', async (req, res) => {
    console.info(`Forwarding request for login...`);
    const {username, password} =  req.body;
    const loginRequest = {
        url: `http://${process.env.CLIENT_API_ROUTE}/login`,
        method: "POST",
        data: {
            username,
            password
        },
    };

    res.json(await sendRequest(loginRequest));
});

router.post('/signup', async (req, res) => {
    console.info(`Forwarding request for signup...`);
    const {username, password, email, firstName, lastName} =  req.body;
  
    const signupRequest = {
        url: `http://${process.env.CLIENT_API_ROUTE}/signup`,
        method: "POST",
        data: {
            username,
            password,
            email,
            firstName,
            lastName,
        },
    };
  
    res.json(await sendRequest(signupRequest));
});

/**
 * obtine informatiile despre un utilizator
 */
router.get('/user/', async (req, res) => {
    console.info(`Forwarding request for user info...`);
  
    const request = {
        url: `http://${process.env.CLIENT_API_ROUTE}/user`,
        method: "GET",
        headers: {
            "x-access-token": req.headers["x-access-token"]
        }
    };
  
    res.json(await sendRequest(request));
});

/**
* actualizeaza datele unui utilizator
*/
router.put('/user', async (req, res) => {
    console.info(`Forwarding request for edit user...`);
    const {username, email, firstName, lastName} =  req.body;
  
    const request = {
        url: `http://${process.env.CLIENT_API_ROUTE}/user`,
        method: "PUT",
        headers: {
            "x-access-token": req.headers["x-access-token"]
        },
        data: {
            username,
            email,
            firstName,
            lastName,
        },
    };
  
    res.json(await sendRequest(request));
});

// Movie management
router.post('/movie', async (req, res) => {
    console.info(`Forwarding request for adding movie...`);
    const {title, description, actors, genre, publishYear, boxOffice, budget} =  req.body;
  
    const request = {
        url: `http://${process.env.CLIENT_API_ROUTE}/movie`,
        method: "POST",
        headers: {
            "x-access-token": req.headers["x-access-token"]
        },
        data: {
            title, 
            description, 
            actors, 
            genre,
            publishYear,
            boxOffice, 
            budget
        },
    };
  
    res.json(await sendRequest(request));
});

router.get('/movie/:movieId', async (req, res) => {
    console.info(`Forwarding request for getting all movies...`);
    const { movieId } = req.params
    const request = {
        url: `http://${process.env.CLIENT_API_ROUTE}/movie/${movieId}`,
        method: "GET",
    };

    res.json(await sendRequest(request));
});

router.get('/movies', async (req, res) => {
    console.info(`Forwarding request for getting all movies...`);
  
    const request = {
        url: `http://${process.env.CLIENT_API_ROUTE}/movies`,
        method: "GET",
    };
  
    res.json(await sendRequest(request));
});

router.put('/movie/favourite/:movieId', async (req, res) => {
    console.info(`Forwarding request for getting all movies...`);
    const { movieId } = req.params
  
    const request = {
        url: `http://${process.env.CLIENT_API_ROUTE}/movie/favourite/${movieId}`,
        method: "PUT",
        headers: {
            "x-access-token": req.headers["x-access-token"]
        },
    };
  
    res.json(await sendRequest(request));
});

router.put('/movie/rate/:movieId', async (req, res) => {
    console.info(`Forwarding request for getting all movies...`);
    const { movieId } = req.params;
    const { rate } = req.body;
  
    const request = {
        url: `http://${process.env.CLIENT_API_ROUTE}/movie/rate/${movieId}`,
        method: "PUT",
        headers: {
            "x-access-token": req.headers["x-access-token"]
        },
        data: {
            rate
        }
    };
  
    res.json(await sendRequest(request));
});

module.exports = router;