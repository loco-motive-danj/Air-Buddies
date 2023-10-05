const express = require('express');
const router = express.Router();

router.use("/products", require("./products"))
router.use("/user", require("./user"))
router.use("/cart", require("./cart"))
router.use("/cart_product", require("./cart_product"))


module.exports = router;