const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

router.get('/practice', validateJWT, (req, res) => {
    res.send("Practice route!")
});

router.get('/about', (req, res) => {
    res.send("About route!")
});

module.exports = router;