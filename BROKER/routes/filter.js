const router = require("express").Router();

const { sendRequest } = require("../http-client");

router.post('/filter', async (req, res) => {
    console.info(`Forwarding request for login...`);
    const loginRequest = {
        url: `http://${process.env.FILTER_API_ROUTE}`,
        method: "POST",
        data: {
            ...req.body
        },
    };

    res.json(await sendRequest(loginRequest));
});

module.exports = router;
