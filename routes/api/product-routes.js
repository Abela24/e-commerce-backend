const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint


// get one product
router.get('/:id', async(req, res) => {
  try {
    const Products = await User.findOne(req.params.id);
    if (!Products) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/',async (req, res) => {
  try{
    const Products = await Product.findAll();
  res.status(200).json(Products);
 } catch(err) {
  res.status(500).json(err);
 }
 
 });

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id',async (req, res) => {
  // delete one product by its `id` value
  try{
    const product = await product.destroy({
      where : {
        id : req.params.id
      }
    });

    if (!product) {
      res.status(404).json({message: 'No Products Found with this id'});
    return
    }

    res.status(200).json(Products);
  }catch(err){
    res.status(500).json(err);

  }

  
});

module.exports = router;


