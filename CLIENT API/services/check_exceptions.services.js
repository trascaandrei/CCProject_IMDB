const check = (req) => {
    return (req.warning || req.error || req.info) ? true : false;
};

module.exports = {
    check: check
};
