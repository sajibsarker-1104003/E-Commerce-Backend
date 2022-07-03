const router = require('express').Router();
const {
    getProducts,
    createProduct,
    getProductById,
    updateProductById
} = require('../controllers/productControllers');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post([authorize, admin], createProduct)
    .get(getProducts);

router.route('/:id')
    .get(getProductById)
    .put(updateProductById);

module.exports = router;
