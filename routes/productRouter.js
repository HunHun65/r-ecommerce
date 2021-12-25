const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");
const Product = require("../models/productModel");
const Recommend = require("../models/Recommend");
const auth = require("../middleware/auth");

router
  .route("/products")
  .get(productCtrl.getProducts)
  .post(productCtrl.createProduct);

router
  .route("/products/:id")
  .get(productCtrl.getProduct)
  .delete(productCtrl.deleteProduct)
  .put(productCtrl.updateProduct);

router.get("/recommend", auth, async (req, res) => {
  const user = req.user;
  const recommendProducts = await Recommend.find({ userId: user.id }).limit(10);
  let ids = [];
  recommendProducts.forEach((v, i) => ids.push(v.productId));
  // console.log(ids)
  // res.json(ids)
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find({
        _id: { $in: ids },
      })
        .sort({ createdAt: -1 })
        .limit(5);
    } else if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find({
        _id: { $in: ids },
      });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
