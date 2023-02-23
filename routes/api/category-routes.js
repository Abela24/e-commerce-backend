const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll();
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
})


  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      const categoriesData = await Category.findOne(req.params.id, {
        include: [{ model: Product, through: Tag, as: 'Catrgory_products' }]
      });
   
      if (!categoriesData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(categoriesData);
    } catch (err) {
      res.status(500).json(err);
    }
});


  // create a new categories
  router.post('/', async (req, res) => {
    try {
      const categoriesData = await Category.create(req.body);
      res.status(200).json(categoriesData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  router.delete('/'),async (req, res) => {
    try{
      const categoriesData = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
      if (categoriesData){
        res.status(404).json({message: 'no cagtegory foudn with this id'});
      return;
      }

      res.status(200).json(categoriesData);
    } catch (err){
      res.status(500).json(err);
    }

    }
  
});

module.exports = router;
