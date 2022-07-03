const router = require('express').Router();
const Category = require('../../models/Category');

//getting all the categories.
router.get('/', async (req, res) => {
    
    try{
        const categories = await Category.find();
        res.status(200).json(category)    
    }
    catch{
        res.status(400).json("no blog found")
    }
});

// create a new Category
router.post('/', async (req, res) => {
    const newCategory = new Category(req.body);
    try{
        const response = await newCategory.save()
        return res.status(200).json("created successfully");
    }
    catch{
        return res.status(200).json("error while creating a blog");
    }
    
});

module.exports = router;