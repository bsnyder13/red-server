const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { FavoritesModel } = require("../models");

// router.get('/practice', validateJWT, (req, res) => {
//     res.send("Practice route!")
// });

// CREATE

router.post("/create", validateJWT, async (req, res) => {
    const { title, date, activity } = req.body.favorites;
    const { id } = req.user;
    const favoritesEntry = {
        title, 
        date, 
        activity, 
        owner: id
    }
    try {
        const newFavorite = await FavoritesModel.create(favoritesEntry);
        res.status(200).json(newFavorite);
    } catch (err) {
        res.status(500).json({ error:err });
    }
    FavoritesModel.create(favoritesEntry)
});

//READ

router.get("/", async (req, res) => {
    try {
        const playlists = await FavoritesModel.findAll();
        res.status(200).json(playlists);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userFavorites = await FavoritesModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userFavorites);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:title", async (req, res) => {
    const { title } = req.params;
    try {
        const results = await FavoritesModel.findAll({
            where: { title: title }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//UPDATE

router.put("/update/:entryId", validateJWT, async (req, res) => {
    const { title, date, entry } = req.body.favorites;
    const favoritesId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: favoritesId,
            owner: userId
        }
    };

    const updatedFavorites = {
        title: title,
        date: date,
        entry: entry
    };

    try {
        const update = await FavoritesModel.update(updatedFavorites, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//DELETE

router.delete("/dlete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const favoritesId = req.params.id;

    try {
        const query = {
            where: {
                id: favoritesId,
                owner: ownerId
            }
        };

        await FavoritesModel.destroy(query);
        res.status(200).json({ message: "Playlist has been removed from favorites" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/about', (req, res) => {
    res.send("About route!")
});

module.exports = router;