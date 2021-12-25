const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const Product = require('../models/productModel')
const Payment = require('../models/orderModel')
const Recommend = require("../models/Recommend");

router.route('/payment')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)


router.get("/train", async (req, res) =>{
        const orders = await Payment.find();
        const result = [];
        orders.map((order) => order.cart.map((cart) => result.push({uid:order.user_id, pid: cart._id, num: cart.quantity})))
        Recommend.deleteMany({});
        res.status(200).json(result);
    
});
    
router.get("/ptrain", async (req, res) =>{
        let products = await Product.find().select("_id");
        res.status(200).json(products.map((v) => ({ pid: v._id})));
});
    
router.post("/addrec", async (req, res) =>{
    try {
        const {productId, userId} = req.body;
        const recommend = new Recommend({
            productId
            , userId
        })
        await recommend.save()
        res.json({msg: "ADD Succes!"})
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
});

module.exports = router