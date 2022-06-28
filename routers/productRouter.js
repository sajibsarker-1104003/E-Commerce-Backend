const express = require("express");
const router = express.Router();
const {
  getProduct,
  createProduct,
  getProductById,
  updateProductById,
} = require("../controllers/productControllers");
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");

router.route("/").post([authorize, admin], createProduct).get(getProduct);

router.route("/:id").get(getProductById).put(updateProductById);

module.exports = router;
