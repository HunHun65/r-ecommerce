const Products = require("../models/productModel");
const Recommend = require("../models/Recommend");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;

      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
      // const products = await Products.find()
      res.json(products);
    } catch (_err) {
      return res.status(500).json({ msg: "Sever error" });
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getProductCategory: async (req, res) => {},
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
        inStock,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "This product already exists." });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
        inStock,
      });
      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category, inStock } =
        req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
          inStock,
        }
      );

      res.json({ msg: "Updated a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // recommend:  async (req, res)=>{
  //     const user = req.user;
  //     const recommendProducts = await Recommend.find({userId: user.id});
  //     let ids = []
  //     recommendProducts.forEach(v => {
  //         ids.push(v.productId)
  //     });
  //     console.log(ids)
  //     const qNew = req.query.new;
  //     const qCategory = req.query.category;
  //     try{
  //         let products;

  //         if(qNew){
  //             products = await Products.find({
  //                 '_id': { $in: ids }
  //             }).sort({ createdAt: -1 }).limit(5);
  //         } else if (qCategory){
  //             products = await Products.find({
  //                 category: {
  //                     $in: [qCategory],
  //                 },
  //             });
  //         } else {
  //             products = await Products.find({
  //                 '_id': { $in: ids }
  //             })
  //         }

  //         res.status(200).json(products);
  //     } catch(err){
  //         res.status(500).json(err);
  //     }
  // }
};

module.exports = productCtrl;
