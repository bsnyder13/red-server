const Express = require("express");
const { NoteModel, UserModel } = require("../models");
const validateJWT = require("../middleware/validate-jwt");
const Note = require("../models/note");
const { Router } = require("express");
const router = Express.Router();

/*
==========
CREATE
==========
*/

router.post('/create', validateJWT, (req, res) => {
    const note = {
        title: req.body.Note.title,
        preference: req.body.Note.preference,
        content: req.body.Note.content,
        UserId: req.user.id,
    }
    NoteModel.create(note)
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/*
==========
READ
==========
*/

router.get('/mine', validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const movieNote = await NoteModel.findAll({
            where: {
                UserId: id
            }
        });
        res.status(200).json(movieNote);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
==========
UPDATE
==========
*/

router.put('/update/:id', validateJWT, async (req, res) => {
    const noteId = req.params.id
    const updatedNote = { content: req.body.Note.content }

    const update = await Note.update(updatedNote, { where: { id: noteId } })
    console.log(update);
    res.json(updatedNote)
})

/*
==========
DELETE
==========
*/

router.delete('/delete/:id', validateJWT, async (req, res) => {
    const noteId = req.params.id;
    const query = { where: { id: noteId } }

    await Note.destroy(query)
    res.json({ message: 'Movie Note Removed' })
});

module.exports = router;