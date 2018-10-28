//THIRD PARTY MODULES
const express = require('express');
const router = express.Router();
const { isMongoId } = require('validator');
//BUILT IN MODULES

//CUSTOM MODULE FILES
const { Recipie } = require('./../model/Recipie');
const { authenticate } = require('./../middleware/authenticate');
//ROUTES

//POST - /recipies - Create New Recipie
router.post('/', authenticate, async (req, res) => {
    const name = req.body.name;
    const instructions = req.body.instructions;

    if (!name) {
        return res.status(400).json({ error: "name is required" });
    } else if (!instructions) {
        return res.status(400).json({ error: "instructions are required" });
    }

    const recipie = new Recipie({
        name,
        instructions,
        ingredients: req.body.ingredients,
        _creator: req.user._id
    });

    const savedRecipie = await recipie.save();
    res.json({ recipie: savedRecipie });
});

//GET - /recipies - GET ALL RECIPIES
router.get('/', authenticate, async (req, res) => {
    try {
        const recipies = await Recipie.find({ _creator: req.user._id }).populate('_creator');
        res.json({ recipies });
    } catch(e) {
        console.log('GET /recipies', e);
    }
});

//GET - /recipies/:id - GET PARTICULAR RECIPIE
router.get('/:id', authenticate, async (req, res) => {
    const _id = req.params.id;
    if (!isMongoId(_id)) {
        return res.status(400).json({ error: "Invalid Id Provided" });
    }

    try {
        const recipie = await Recipie.findOne({ _id, _creator: req.user._id }).populate('_creator');
        if (recipie) {
            res.json({ recipie });
        } else {
            res.status(400).json({ error: "No Recipie Found" });
        }
    } catch(e) {
        console.log('GET /recipies/:id', e);
    }
});

//DELETE - /recipies/:id - DELETE PARTICULAR RECIPIE
router.delete('/:id', authenticate, async (req, res) => {
    const _id = req.params.id;
    if (!isMongoId(_id)) {
        return res.status(400).json({ error: "Invalid Id Provided" });
    }

    try {
        const deletedRecipie = await Recipie.findOneAndDelete({ _id, _creator: req.user._id });
        if (deletedRecipie) {
            res.json({ recipie: deletedRecipie });
        } else {
            res.status(400).json({ error: "No Recipie Found With This Id" });
        }
    } catch(e) {
        console.log('DELETE /recipies/:id', e);
    }
});

//PUT - /recipies/:id - UPDATE PARTICULAR RECIPIE
router.put('/:id', authenticate, async (req, res) => {
    const _id = req.params.id;
    if (!isMongoId(_id)) {
        return res.status(400).json({ error: "Invalid Id Provided" });
    }

    let updateObj = {};

    if (req.body.name) updateObj.name = req.body.name;
    if (req.body.instructions) updateObj.instructions = req.body.instructions;
    if (req.body.ingredients) updateObj.ingredients = req.body.ingredients;

    try {
        const updatedRecipie = await Recipie.findOneAndUpdate({ _id, _creator: req.user._id }, { $set: updateObj}, { new: true });

        if (updatedRecipie) {
            res.json({ recipie: updatedRecipie });
        } else {
            res.status(400).json({ error: "No Recipie Found With This Id" });
        }
    } catch(e) {
        console.log('PUT /recipies/:id', e);
    }
});


//EXPORTING ROUTER
module.exports = router;