let router = require('express').Router();

router.get('/home', (req, res) => {
    if (req.body) {
        res.status(200).send(`got your body: ${req.body}`);
    } else {
        res.status(200).send("hello!");
    }
})

module.exports = router;