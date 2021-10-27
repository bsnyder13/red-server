const { Router } = require("express");
const { MovieModel } = require("../models");
const validateJWT = require("../middleware/validate-jwt");
const Movie = require("../models/movie");
const User = require("../models/user");
const router = Router();

/*
=============
CREATE
=============
*/

router.post('/create', validateJWT, (req, res) => {

    const watchLater = {
        title: req.body.Movie.title,
        UserId: req.user.id,
    }
    MovieModel.create(watchLater)
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err, sending: watchLater }))
});

/*
=============
GET BY USER
=============
*/

router.get('/mine', validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const watchLater = await MovieModel.findAll({
            where: {
                UserId: id
            }
        });
        res.status(200).json(watchLater);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
==============
DELETE MOVIE
==============
*/

router.delete('/delete/:id', validateJWT, async (req, res) => {
    const movieId = req.params.id;
    const query = { where: { id: movieId } }

    await Movie.destroy(query)
    res.json({ message: 'Movie Removed' })
});

module.exports = router;