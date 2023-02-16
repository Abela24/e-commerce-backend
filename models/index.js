// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  through: {
    model : ProductTag,
    unique: false
  },
  as: 'product_tag'
});
// Categories have many Products
Category.belongsToMany(Product, {
 through:{
  model: ProductTag,
  unique : false

 },
as: 'Category_Product'
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag,{
through : {
  model : ProductTag,
  unique : false
},
as: 'Profuct_Tag'
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,{
  through: {
    model: ProductTag,
    unique: false
  },
  as: ' Tag_Product'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
