const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async  (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagIds = await Tag.findAll();
    res.status(200).json(tagIds);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id',async  (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagIds = await Tag.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      include: [{ model: Tag, through:ProductTag, as: 'tag_product' }]
    });

    if (!tagIds) {
      res.status(404).json({ message: 'No producttag found with this id!' });
      return;
    }

    res.status(200).json(tagIds);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
    try {
      const tagIds = await Tag.create(req.body);
      res.status(200).json(tagIds);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagIds = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagIds) {
      res.status(404).json({ message: 'No trip with this id!' });
      return;
    }
    res.status(200).json(tagIds);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
