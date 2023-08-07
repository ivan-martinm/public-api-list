const categoriesRouter = require('express').Router();
const Category = require('../models/category');

categoriesRouter.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        return res.json(categories.map(category => category.name)); 
    } catch (error) {
        return res.status(400).json({ message: 'Request not valid' });
    }
})

module.exports = categoriesRouter;